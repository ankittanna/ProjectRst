'use strict';

var watch = require('gulp-watch');
var connect = require('gulp-connect');

module.exports = function (gulp) {

    gulp.task('watch', function () {
        gulp.watch(['./assets/**/*.html'], ['lint-html']);
        gulp.watch(['./assets/www/**/*.js', './assets/www/spec/**/*.js'], ['build-js', 'test-js']);
        gulp.watch(['./assets/www/**/*.js', './assets/www/spec/**/*.js'], ['build-js', 'test-js']);
        gulp.watch(['./assets/www/css/**/*.css'], ['css-prefix', 'css-lint', 'css-concat']);
    });
};