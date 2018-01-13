package org.rg.archetype.bl.auth.signup;

import org.rg.archetype.bl.account.UserHelper;
import org.rg.archetype.data.hibernate.entity.User;
import org.rg.archetype.data.shared.SignupDTO;

public class SignupHelper {

	/**
	 * Assume everything with signup object has been validated.
	 * 
	 * @param signup
	 * @return
	 */
	public static User setupAccount(SignupDTO signup) {
		User user = UserHelper.createUser(signup.getEmail(), signup.getPassword(), signup.getEmail());
		return user;
	}
}
