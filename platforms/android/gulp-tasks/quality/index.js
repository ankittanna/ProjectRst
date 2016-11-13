'use strict';

var fs = require('fs');
var path = require('path');
var htmlhint = require('gulp-htmlhint');
var eslint = require('gulp-eslint');
var eslintConfig = JSON.parse(fs.readFileSync('./.eslintrc.json'));
var reporter = require('eslint-html-reporter');

module.exports = function(gulp) {
	gulp.task('lint-html', function() {
		gulp.src('./assets/www/**/*.html')
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.failReporter({ suppress: false }));

        gulp.src('./assets/www/views/**/*.html')
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.failReporter({ suppress: false }));
	});

	gulp.task('es-lint', function() {
            return gulp.src(['./assets/www/**/*.js',
                             '!node_modules/**',
                             '!./assets/www/cordova-js-src/**',
                             '!./assets/www/cordova*.js',
                             '!./assets/www/lib/**',
                             '!./assets/www/plugins/**',
                             '!./assets/www/spec/lib/**'
                             ])
                .pipe(eslint(
                    {
						rules: eslintConfig,
						globals: ['jQuery', '$', 'angular'],
                        envs: ['browser']
                    }
                ))
                .pipe(eslint.formatEach('compact', process.stderr))
                .pipe(eslint.result(function(result) {
                      console.log('ESLint result: ' + result.filePath);
                      console.log('# Messages: ' + result.messages.length);
                      console.log('# Warnings: ' + result.warningCount);
                      console.log('# Errors: ' + result.errorCount);
                 }))
                .pipe(eslint.format(reporter, function(results) {
                            fs.writeFileSync(path.join(__dirname, 'report-results.html'), results);
                          }))
                .pipe(eslint.failAfterError());
	});
};