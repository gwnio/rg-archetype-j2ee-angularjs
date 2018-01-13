define(['src/app/res/AppConstants'], function(appConsts) {
	return ['$window', '$state', '$stateParams', 'AuthHttpService', 'appUrisService', 'spinnerService', ctrlr];
	
	function ctrlr($window, $state, $stateParams, AuthHttpService, appUrisService, spinnerService) {
		var vm = this;
		var onLoginGo = $stateParams.go;
		
		// public variables
		vm.serverErrs = [];
		vm.user = {
			email : '',
			password : ''
		};
		
		// public functions
		vm.getCssClasses = getCssClasses;
		vm.login = login;
		vm.goToForgot = goToForgot;
		vm.goToCreateAccount = goToCreateAccount;
		
		function getCssClasses(formCtrlr, modelCtrlr) {
			return {
		    	'has-error': modelCtrlr.$invalid && (modelCtrlr.$dirty || formCtrlr.$submitted),
		    	'has-success': modelCtrlr.$valid
		    };
		};
		
		function login() {
			vm.serverErrs.length = 0;
		    
			spinnerService.show(appConsts.screenLoadingSpinner);
			
		    AuthHttpService.login(vm.user.email, vm.user.password).then(function(result) {
		    	spinnerService.hide(appConsts.screenLoadingSpinner);
		    	
		    	if (result.data.resultCode === 1) {
		    		if (angular.isDefined(onLoginGo)) {
		    			$window.location.href = onLoginGo;
		    		} else {
		    			$window.location.href = appUrisService.getAppUrl();
		    		}
		    	} else {
		    		var errs = result.data.errs;
					for (var i = 0; i < errs.length; i++) {
						vm.serverErrs.push(errs[i]);
					}
		    	}
		    });
		};
		
		function goToForgot() {
			// TODO
		};
		
		function goToCreateAccount() {
			$state.go('app.signup');
		}
	};
})