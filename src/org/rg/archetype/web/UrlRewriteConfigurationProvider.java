package org.rg.archetype.web;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.ocpsoft.rewrite.annotation.RewriteConfiguration;
import org.ocpsoft.rewrite.config.Configuration;
import org.ocpsoft.rewrite.config.ConfigurationBuilder;
import org.ocpsoft.rewrite.config.Direction;
import org.ocpsoft.rewrite.servlet.config.Forward;
import org.ocpsoft.rewrite.servlet.config.HttpConfigurationProvider;
import org.ocpsoft.rewrite.servlet.config.Path;
import org.rg.archetype.common.AppUris;
import org.rg.archetype.data.model.AppData;

/**
 * http://www.ocpsoft.org/rewrite/
 */
@RewriteConfiguration
public class UrlRewriteConfigurationProvider extends HttpConfigurationProvider {
	
	@Override
	public Configuration getConfiguration(final ServletContext context) {
		/**
		 * Urls that do not require a authenticated user
		 */
		final List<String> publicUrls = new ArrayList<String>();
		publicUrls.add("/login");
		publicUrls.add("/signup");
		
		/**
		 * Urls that require a authenticated user
		 */
		final List<String> secureUrls = new ArrayList<String>();
		secureUrls.add("/" + AppUris.ROOT_PATH_NAME);
		
		String appPublicEp = AppData.getInstance().getAppPublicEp();
		String appSecureEp = AppData.getInstance().getAppSecureEp();
		
		ConfigurationBuilder cfgBldr = ConfigurationBuilder.begin();
		for (String publicUrl : publicUrls) {
			cfgBldr.addRule().when(Direction.isInbound().and(Path.matches(publicUrl))).perform((Forward.to(appPublicEp)));
		}
		for (String secureUrl : secureUrls) {
			cfgBldr.addRule().when(Direction.isInbound().and(Path.matches(secureUrl))).perform((Forward.to(appSecureEp)));
		}
		
		return cfgBldr;
	}

	@Override
	public int priority() {
		/* This provides ordering if you have multiple configurations */
		return 10;
	}
}
