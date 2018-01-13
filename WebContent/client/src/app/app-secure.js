define([
	'src/app/secure/AppSecureTemplates',
	'src/app/core/CoreModule',
	'src/app/secure/MainModule'
], function(
	Templates,
	CoreModule,
	MainModule) {
	var moduleName = 'app';
	
	var module = angular.module(moduleName, ['app.secure.templates', 'app.core', 'app.secure']);
	
	module.run(['$templateCache', '$compile', '$rootScope', '$location', '$state', function($templateCache, $compile, $rootScope, $location, $state) {
		var templatesHTML = $templateCache.get('app.secure.templates');
		$compile(templatesHTML)($rootScope);
		
		$state.go('app.dashboard', {}, {location: false});
		
		removeSplash();
	}])
	
	// let the splash page display briefly
	setTimeout(asyncBootstrap, 2000);
	
	function asyncBootstrap() {
		angular.bootstrap(document.getElementsByTagName("body")[0], [moduleName]);
	}
	
	function removeSplash() {
		if (!('remove' in Element.prototype)) {
		    Element.prototype.remove = function() {
		        if (this.parentNode) {
		            this.parentNode.removeChild(this);
		        }
		    };
		}
		
		var element = document.getElementById('splash');
		element.remove();
		element = null;
	}
	
	return module;
});