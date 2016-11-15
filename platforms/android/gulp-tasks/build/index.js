'use strict';

module.exports = function (gulp) {

    gulp.task('build-js', ['es-lint', 'test-js', 'js-concat']);

    gulp.task('build-css', ['css-prefix', 'css-lint', 'css-concat']);

    gulp.task('clean', ['clean-all']);
};