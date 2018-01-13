define([], function() {
	return ['$http', 'appUrisService', srvc];
	
	function srvc($http, appUrisService) {
		return {
			isSignupUniqueEmail : isSignupUniqueEmail,
			isPasswordValidCheck : isPasswordValidCheck,
			qsignup : qsignup,
			login : login,
			getUser : getUser,
			logout : logout
		};
		
		function isSignupUniqueEmail(email) {
			return $http({
				method : 'POST',
			    url : appUrisService.getRestUrl('/auth/signup/uniqueEmail'),
			    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest : function(obj) {
			    	var str = [];
			    	for (var p in obj) {
			    		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			    	}
			    	return str.join("&");
			    },
			    data : {
			    	p0: email
			    }
			}).then(c)
			.catch(f);
			
			function c(response) {
				return response.data.result;
			}
			
			function f(error) {
				// TODO
			}
		}
		
		function isPasswordValidCheck(pwd) {
			return $http({
			    method : 'POST',
			    url : appUrisService.getRestUrl('/auth/password/check'),
			    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest : function(obj) {
			        var str = [];
			        for (var p in obj) {
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        }
			        return str.join("&");
			    },
			    data : {
			    	pwd : pwd
			    }
			});
		}
		
		function qsignup(signup) {
			return $http({
			    method : 'POST',
			    url : appUrisService.getRestUrl('/auth/qsignup'),
			    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest : function(obj) {
			        var str = [];
			        for (var p in obj) {
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        }
			        return str.join("&");
			    },
			    data : {
			    	p0: JSON.stringify(signup)
			    }
			});
		}
		
		function login(email, password) {
			return $http({
			    method : 'POST',
			    url : appUrisService.getRestUrl('/auth/login'),
			    headers : {'Content-Type': 'application/x-www-form-urlencoded'},
			    transformRequest : function(obj) {
			        var str = [];
			        for (var p in obj) {
			        	str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			        }
			        return str.join("&");
			    },
			    data : {
			    	username : email,
			    	password : password
			    }
			});
		}
		
		function getUser() {
			return $http.get(appUrisService.getRestUrl('/auth/user'), {
				params : {
				}
			});
		}
		
		function logout() {
			return $http.post(appUrisService.getRestUrl('/auth/logout')).then(function(result) {
			});
		}
	};
});