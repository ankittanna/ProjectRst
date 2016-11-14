'use strict';

var watch = require('gulp-watch')

module.exports = function (gulp) {

    gulp.task('watch', function () {
        gulp.watch(['assets/**/*.html'], ['lint-html-report']);
        gulp.watch(['assets/**/*.html', 'assets/**/*.js'], function () {
            connect.reload();
        });
        gulp.watch(['app/scripts/**/*.js', 'test/**/*.js'], ['build-js']);
    });
};