<!DOCTYPE html>
<html>
<head>
	<base href="<%= request.getContextPath() %>/">
	
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
	
	<link rel="stylesheet/less" type="text/css" href="client/assets/less/style.less" />
	
	<script type="text/javascript">
		var contextPath = '<%= request.getContextPath() %>';
	</script>
</head>
<body>
	<div id="splash" class="splash" ng-animate-children>
		<style type="text/css">
			div.splash {
				color: #FFFFFF;
				position: absolute;
				top: 50%;
				transform: translate(0, -50%);
				left: 0;
				right: 0;
			}
		</style>
		<img src="client/assets/img/splash.jpg" class="img-responsive" style="display: block; margin-left: auto; margin-right: auto;">
	</div>
	
	<div ui-view></div>
	
	<script src="https://cdnjs.cloudflare.com/ajax/libs/less.js/2.6.1/less.min.js"></script>
	<script src="client/vendor/headjs/head-1.0.2.js" type="text/javascript"></script>
	<script src="client/src/assets/js/boot-secure.js" type="text/javascript"></script>
</body>
</html>