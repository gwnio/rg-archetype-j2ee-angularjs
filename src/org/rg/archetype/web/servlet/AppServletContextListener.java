package org.rg.archetype.web.servlet;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import org.rg.archetype.data.model.AppData;
import org.rg.archetype.data.model.EnvironmentType;

@WebListener
public class AppServletContextListener implements ServletContextListener {
	
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		AppData.getInstance().setEnvironmentType(EnvironmentType.PROD);
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
	}
}
