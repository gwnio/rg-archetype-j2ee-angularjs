define([], function() {
	return ['$window', 'appUrisService', ctrlr];
	
	function ctrlr($window, appUrisService) {
		var vm = this;
		
		vm.goToHome = goToHome;
		vm.appName = $window.appName;
		
		function goToHome() {
			$window.location.href = appUrisService.getHomeUrl();
		}
	};
});