'use strict';

module.exports = function (gulp) {

    gulp.task('build-js', function () {

    });

    gulp.task('build-css', ['css-prefix', 'css-lint', 'css-concat']);

    gulp.task('clean', ['clean-all']);
};