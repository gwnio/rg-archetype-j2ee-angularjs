define([], function() {
	return ['$window', '$uibModal', 'AuthHttpService', 'principal', 'appUrisService', srvc];
	
	function srvc($window, $uibModal, AuthHttpService, principal, appUrisService) {
		return {
			logout : logout
		};
		
		function logout() {
			var modal = $uibModal.open({
				templateUrl : 'client/src/app/widget/modal/yes-no.modal.tpl.html',
				controller : 'YesNoModalController',
				controllerAs : "ctrlr",
				size : 'sm',
				resolve : {
					title : function() {
						return "Confirm Logout";
					},
					message : function() {
						return "Are you sure you want to logout?";
					},
					yesButtonText : function() {
						return "Yes";
					},
					noButtonText : function() {
						return "No";
					}
				}
			});
			
			modal.result.then(function() {
				AuthHttpService.logout().then(function(result) {
					principal.authenticate(null);
					$window.location.href = appUrisService.getLoginUrl();
				});
			});
		}
	}
})