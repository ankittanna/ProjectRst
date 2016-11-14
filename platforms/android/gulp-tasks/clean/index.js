module.exports = function (gulp) {

	var rimraf = require('gulp-rimraf');

    gulp.task('clean-all', function() {
        return gulp.src(['dist/*'])
            .pipe(rimraf());
    });
};