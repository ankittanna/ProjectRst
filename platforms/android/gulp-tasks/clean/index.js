'use strict';

module.exports = function cleanTasks(gulp) {

	var rimraf = require('gulp-rimraf');

    gulp.task('clean-all', function cleanAllTask() {
        return gulp.src([ 'dist/*', 'gulp-tasks/quality/*.html' ])
            .pipe(rimraf());
    });
};
