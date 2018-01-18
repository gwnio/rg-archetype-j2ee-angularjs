module.exports = {

	compile_dir : '../compile',
	dist_dir : '../dist',

	app_files : {
		js : [ '../src/**/*.js' ]
	},

	app_public_files : {
		templates : [ '../src/app/public/**/*.tpl.html' ],
		less : '../assets/less/style.less'
	},

	app_secure_files : {
		templates : [ '../src/app/**/*.tpl.html', '!../src/app/public/**', '../src/common/**/*.tpl.html' ],
		less : '../assets/less/style.less'
	},

	app_public_vendor_files : {
		js : [ '../vendor/requirejs/require-2.2.0.js',
				'../vendor/angular/angular-1.5.8.js',
				'../vendor/angular/extras/angular-ui-router-0.3.1.min.js',
				'../vendor/angular/extras/angular-messages-1.5.9.min.js',
				'../vendor/angular/extras/angular-spinners.min.js',
				'../vendor/angular/extras/angular-sanitize.js'
				 ],
		css : [],
		assets : []
	},

	app_secure_vendor_files : {
		js : [ '../vendor/requirejs/require-2.2.0.js',
				'../vendor/angular/angular-1.5.8.js',
				'../vendor/angular/extras/angular-ui-router-0.3.1.min.js',
				'../vendor/angular/extras/angular-messages-1.5.9.min.js',
				'../vendor/angular/extras/ui-bootstrap-tpls-1.3.3.js',
				'../vendor/angular/extras/angular-spinners.min.js',
				'../vendor/angular/extras/angular-sanitize.js'
				],
		css : [],
		assets : []
	}
};