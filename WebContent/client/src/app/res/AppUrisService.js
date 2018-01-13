define([], function() {
	return ['$window', srvc];
	
	function srvc($window) {
		return {
			getRestUrl : getRestUrl,
			getHomeUrl : getHomeUrl,
			getLoginUrl : getLoginUrl,
			getAppUrl : getAppUrl
		};
		
		function getRestUrl(url) {
			return $window.contextPath + '/app/rest' + url;
		}
		
		function getHomeUrl() {
			return $window.contextPath + '/';
		}
		
		function getLoginUrl() {
			return $window.contextPath + '/login';
		}
		
		function getAppUrl() {
			return $window.contextPath + '/app';
		}
	};
});