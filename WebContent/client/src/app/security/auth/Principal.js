/*
 * http://stackoverflow.com/questions/22537311/angular-ui-router-login-authentication
 * http://plnkr.co/edit/UkHDqFD8P7tTEqSaCOcc?p=preview
 */
define([], function() {
	return ['$q', 'AuthHttpService', principal];
	
	function principal($q, AuthHttpService) {
		var _identity = undefined;
		var _authenticated = false;
		
		return {
			isIdentityResolved : isIdentityResolved,
			isAuthenticated : isAuthenticated,
			isInRole : isInRole,
			isInAnyRole : isInAnyRole,
			authenticate : authenticate,
			identity : identity,
			getId : getId,
			getUserEmail : getUserEmail,
			getUserAccountId : getUserAccountId
		}
		
		function getId() {
			return _identity;
		}
		
		function getUserEmail() {
			return _identity.email;
		}
		
		function getUserAccountId() {
			return _identity.account.id;
		}
		
		function isIdentityResolved() {
			var r = angular.isDefined(_identity);
			return r;
		}
		
		function isAuthenticated() {
			return _authenticated;
		}
		
		function isInRole(role) {
			if (!_authenticated || !_identity.role) {
				return false;
			}
			return _identity.role === role;
		}
		
		function isInAnyRole(roles) {
			if (!_authenticated || !_identity.role) {
				return false;
			}

			for (var i = 0; i < roles.length; i++) {
				if (isInRole(roles[i])) {
					return true;
				}
			}

			return false;
		}
		
		function authenticate(identity) {
			_identity = identity;
			_authenticated = identity != null;
		}
		
		function identity(force) {
			var deferred = $q.defer();
			
			if (force) {
				_identity = undefined;
			}
			
			if (angular.isDefined(_identity)) {
				deferred.resolve(_identity);
				
				return deferred.promise;
			}
			
			var self = this;
			AuthHttpService.getUser().success(function(response) {
				if (response.resultCode === 1) {
					self.authenticate(response.result);
				} else {
					self.authenticate(null);
				}
				deferred.resolve(_identity);
			}).error(function() {
				self.authenticate(null);
				deferred.resolve(_identity);
			});
			
			return deferred.promise;
		}
	};
})