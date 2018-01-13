package org.rg.archetype.web.rest;

import java.util.Arrays;
import java.util.List;

import javax.security.auth.login.FailedLoginException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.rg.archetype.bl.account.UserLoginHelper;
import org.rg.archetype.bl.auth.signup.SignupHelper;
import org.rg.archetype.bl.auth.signup.SignupValidator;
import org.rg.archetype.bl.user.PwdValidator;
import org.rg.archetype.common.UserPrincipal;
import org.rg.archetype.data.hibernate.HibernateUtil;
import org.rg.archetype.data.hibernate.dao.DAOFactory;
import org.rg.archetype.data.hibernate.entity.User;
import org.rg.archetype.data.model.AuthenticationException;
import org.rg.archetype.data.shared.ReqParams;
import org.rg.archetype.data.shared.ResponseDTO;
import org.rg.archetype.data.shared.SignupDTO;
import org.rg.archetype.data.shared.UserDTO;
import org.rg.archetype.data.transformer.SafeUserDtoTransformer;
import org.rg.archetype.web.HttpServletRequestHelper;

import com.google.gson.Gson;

@Path("/auth")
public class AuthRS extends BaseRS {

	private static Log log = LogFactory.getLog(AuthRS.class);
	
	@POST
	@Path("/signup/uniqueEmail")
	@Produces({MediaType.APPLICATION_JSON})
	public Response signupUniqueEmail(
			@FormParam(ReqParams.PARAM0) String email) {
		ResponseDTO<Boolean> response = new ResponseDTO<Boolean>();
		User user = DAOFactory.getInstance().getUserDAO().findByUsername(email);
		response.setResult(user == null);
		String json = new Gson().toJson(response);
		return Response.ok(json, MediaType.APPLICATION_JSON).build();
	}
	
	@POST
	@Path("/password/check")
	@Produces({MediaType.APPLICATION_JSON})
	public Response isPasswordValidCheck(
			@FormParam("pwd") String pwd) {
		ResponseDTO<List<String>> response = new ResponseDTO<List<String>>();
		response.setResult(new PwdValidator().validate(pwd));
		String json = new Gson().toJson(response);
		return Response.ok(json, MediaType.APPLICATION_JSON).build();
	}
	
	/**
	 * Quick signup
	 * 
	 * @param signupJson
	 * @param httpRequest
	 * @return
	 */
	@POST
	@Path("/qsignup")
	@Produces({MediaType.APPLICATION_JSON})
	public Response qsignup(
			@FormParam(ReqParams.PARAM0) String signupJson,
			@Context HttpServletRequest httpRequest) {
		SignupDTO signup = new Gson().fromJson(signupJson, SignupDTO.class);
		signup.setPasswordConfirm(signup.getPassword());
		
		ResponseDTO<UserDTO> response;
		
		SignupValidator validator = new SignupValidator() {
			
			@Override
			protected boolean chkPwds(List<String> errs, SignupDTO signup) {
				return true;
			}
		};
		
		List<String> errs = validator.isValid(signup);
		if (errs.size() == 0) {
			User user = SignupHelper.setupAccount(signup);
			HibernateUtil.getSessionFactory().getCurrentSession().update(user);
			
			try {
				HibernateUtil.commit();
				
				httpRequest.login(user.getUsername(), signup.getPassword());
				response = new ResponseDTO<UserDTO>(new SafeUserDtoTransformer().transform(user));
			} catch (ServletException e) {
				log.error(e);
				HibernateUtil.rollback();
				response = new ResponseDTO<UserDTO>(ResponseDTO.RESULT_FAIL);
				response.setErrs(Arrays.asList(new String[] {e.getMessage()}));
			}
		} else {
			response = new ResponseDTO<UserDTO>(ResponseDTO.RESULT_FAIL);
			response.setErrs(errs);
		}
		
		String json = new Gson().toJson(response);
		return Response.ok(json, MediaType.APPLICATION_JSON).build();
	}
	
	@POST
	@Path("/login")
	@Produces({MediaType.APPLICATION_JSON})
	public Response login(
			@FormParam("username") String username,
			@FormParam("password") String password,
			@Context HttpServletRequest httpRequest) {
		ResponseDTO<UserDTO> response;
		
		try {
			User user = null;
			if (httpRequest.getUserPrincipal() == null) {
				UserLoginHelper.validateLogin(username, password);
				httpRequest.login(username, password);
				
				user = HttpServletRequestHelper.getUser(httpRequest);
			} else {
				user = getAuthUser(httpRequest);
			}
			response = new ResponseDTO<UserDTO>(new SafeUserDtoTransformer().transform(user));
			return Response.ok(new Gson().toJson(response), MediaType.APPLICATION_JSON).build();
		} catch (FailedLoginException | ServletException e) {
			response = new ResponseDTO<UserDTO>(ResponseDTO.RESULT_FAIL);
			response.setErrs(Arrays.asList(e.getMessage()));
			return Response.ok(new Gson().toJson(response), MediaType.APPLICATION_JSON).build();
		}
	}
	
	@GET
	@Path("/user")
	@Produces({MediaType.APPLICATION_JSON})
	public Response getUser(
			@Context HttpServletRequest httpRequest) {
		try {
			UserPrincipal principal = authenticate(httpRequest);
			
			User obj = DAOFactory.getInstance().getUserDAO().findByUsername(principal.getUsername());
			if (obj == null) {
				throw new AuthenticationException("Could not find user.");
			}
			
			UserDTO dto = new SafeUserDtoTransformer().transform(obj);
			
			ResponseDTO<UserDTO> response = new ResponseDTO<UserDTO>(dto);
			String json = new Gson().toJson(response);
			
			return Response.ok(json, MediaType.APPLICATION_JSON).build();
		} catch (AuthenticationException e) {
			return Response.status(Response.Status.UNAUTHORIZED).build();
		}
	}
	
	@POST
	@Path("/logout")
	public Response logout(
			@Context HttpServletRequest httpRequest) {
		httpRequest.getSession().invalidate();
		return Response.ok().build();
	}
}
