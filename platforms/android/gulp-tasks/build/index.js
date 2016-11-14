'use strict';

module.exports = function (gulp) {

	var rimraf = require('gulp-rimraf');

    gulp.task('build-js', function () {

    });

    gulp.task('build-css', ['css-prefix', 'css-lint', 'css-concat']);

    gulp.task('clean', function() {
        return gulp.src(['dist/*'])
            .pipe(rimraf());
    });
};