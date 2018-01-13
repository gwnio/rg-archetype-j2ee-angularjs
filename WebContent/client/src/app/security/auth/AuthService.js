define([], function() {
	return ['$window', '$state', 'principal', 'appUrisService', srvc];
	
	function srvc($window, $state, principal, appUrisService) {
		return {
			authorize : function(roles) {
				return principal.identity(true).then(function() {
					var isAuthenticated = principal.isAuthenticated();
					
					if (roles && roles.length > 0 && !principal.isInAnyRole(roles)) {
						if (isAuthenticated) {
							$state.go('app.accessDenied');
						} else {
							var requestedUrl = $window.location.href;
							$window.location.href = appUrisService.getLoginUrl() + '?go=' + requestedUrl;
						}
					}
				});
			}
		};
	};
})