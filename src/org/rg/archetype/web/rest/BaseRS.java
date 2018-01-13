package org.rg.archetype.web.rest;

import javax.servlet.http.HttpServletRequest;

import org.rg.archetype.common.UserPrincipal;
import org.rg.archetype.data.hibernate.dao.DAOFactory;
import org.rg.archetype.data.hibernate.entity.User;
import org.rg.archetype.data.model.AuthenticationException;

public class BaseRS {

	protected UserPrincipal authenticate(HttpServletRequest request) throws AuthenticationException {
		UserPrincipal principal = (UserPrincipal)request.getUserPrincipal();
		if (principal == null) {
			throw new AuthenticationException("Not logged in");
		}
		return principal;
	}
	
	protected User getAuthUser(HttpServletRequest request) throws AuthenticationException {
		UserPrincipal principal = authenticate(request);
		User user = DAOFactory.getInstance().getUserDAO().findByUsername(principal.getUsername());
		return user;
	}
}
