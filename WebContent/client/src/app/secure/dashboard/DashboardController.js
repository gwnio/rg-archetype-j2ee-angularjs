define([], function() {
	return ['$window', 'logoutService', ctrlr];
	
	function ctrlr($window, logoutService) {
		var vm = this;
		
		// public functions
		vm.logout = logout;
		
		function logout() {
			logoutService.logout();
		}
	};
});