/*eslint no-unused-vars: "off"*/
'use strict';

var watch = require('gulp-watch');
var connect = require('gulp-connect');

module.exports = function watchTasks(gulp) {

    gulp.task('watch', function watchTask() {
        gulp.watch([ './assets/**/*.html' ], [ 'lint-html' ]);

        gulp.watch([ './assets/www/**/*.js',
                    './assets/www/spec/**/*.js',
                    './gulpfile.js',
                    './karma.conf.js',
                    './gulp-tasks/**/*.js' ],
                    [ 'build-js', 'test-js' ]);

        gulp.watch([ './assets/www/css/**/*.css' ], [ 'css-prefix', 'css-lint', 'css-concat' ]);
    });
};
