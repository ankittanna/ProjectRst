// Karma configuration
// Generated on Tue Nov 15 2016 00:25:25 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      './assets/www/lib/ionic/js/ionic.bundle.js',
      './assets/www/lib/lodash/lodash.js',
      './assets/www/js/lodash.importer.js',
      './assets/www/services/lodash.factory.js',
      './assets/www/services/keys.service.js',
      './assets/www/js/index.js',
      './assets/www/js/controllers.js',
      './assets/www/views/**/*.js',
      './assets/www/js/app.js',
      './assets/www/spec/*.js'
    ],

    // list of files to exclude
    exclude: [
        './assets/www/spec/lib/*.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        './assets/www/views/**/*.js': ['coverage'],
        './assets/www/services/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
          type : 'html',
          dir : 'coverage/'
        },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'PhantomJS', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 4
  })
}
