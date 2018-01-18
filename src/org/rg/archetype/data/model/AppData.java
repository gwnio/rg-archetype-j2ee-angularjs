package org.rg.archetype.data.model;

public class AppData {

private static AppData instance;
	
	public static AppData getInstance() {
		if (instance == null) {
			instance = new AppData();
		}
		return instance;
	}
	
	private EnvironmentType environmentType;
	
	public EnvironmentType getEnvironmentType() {
		return environmentType;
	}

	public void setEnvironmentType(EnvironmentType environmentType) {
		this.environmentType = environmentType;
	}

	public boolean isEnvironmentDev() {
		return environmentType.equals(EnvironmentType.DEV);
	}
	
	public boolean isEnvironmentProd() {
		return environmentType.equals(EnvironmentType.PROD);
	}
	
	public String getAppPublicEp() {
		String rslt;
		if (isEnvironmentProd()) {
			rslt = "/client/dist/index-app-public.jsp";
		} else {
			rslt = "/client/src/index-app-public.jsp";
		}
		return rslt;
	}
	
	public String getAppSecureEp() {
		String rslt;
		if (isEnvironmentProd()) {
			rslt = "/client/dist/index-app-secure.jsp";
		} else {
			rslt = "/client/src/index-app-secure.jsp";
		}
		return rslt;
	}
}
