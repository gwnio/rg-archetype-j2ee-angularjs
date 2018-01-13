package org.rg.archetype.web.rest;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import org.rg.archetype.common.AppUris;

@ApplicationPath(AppUris.ROOT_PATH_NAME + "/rest")
public class RestServices extends Application {

	private Set<Object> singletons = new HashSet<Object>();
	
	public RestServices() {
		singletons.add(new AuthRS());
	}
	
	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}
}
