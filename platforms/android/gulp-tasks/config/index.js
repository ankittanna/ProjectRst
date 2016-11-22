'use strict';

module.exports = {
	allJs: [ '*/**/*.js' ],
	lintJs: [
		'./assets/www/**/*.js',
		'!node_modules/**',
		'!./assets/www/cordova-js-src/**',
		'!./assets/www/cordova*.js',
		'!./assets/www/lib/**',
		'!./assets/www/plugins/**',
		'!./assets/www/spec/lib/**',
		'./gulpfile.js',
		'./karma.conf.js',
		'./gulp-tasks/**/*.js'
	],
	lintHtml: [
		'./assets/www/**/*.html',
		'./assets/www/views/**/*.html'
	],
	jsMainConcat: [
		'./assets/www/js/*.js',
		'./assets/www/services/*.js',
		'./assets/www/views/**/*.js'
	],
	jsVendorConcat: [
		'./assets/www/lib/ionic/ionic.bundle.min.js',
		'./assets/www/lib/lodash/lodash.js'
	],
	cssPrefix: [
		'./assets/www/css/*.css'
	],
	cssLint: [
		'./assets/www/css/*.css',
		'!./assets/www/css/font-awesome.min.css'
	],
	cssConcatMain: [
		'./assets/www/css/*.css',
		'!./assets/www/css/font-awesome.min.css'
	],
	cssConcatVendor: [
		'./assets/www/css/font-awesome.min.css',
		'./assets/www/lib/ionic/css/ionic.min.css'
	],
	watch: {
		html: [ './assets/**/*.html' ],
		js: [ './assets/www/**/*.js',
             './assets/www/spec/**/*.js',
             './gulpfile.js',
             './karma.conf.js',
             './gulp-tasks/**/*.js'
             ],
         css: [
            './assets/www/css/**/*.css'
         ]
	}
};
