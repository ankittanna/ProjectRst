'use strict';

var html5Lint = require('gulp-html5-lint');

module.exports = function(gulp) {
	gulp.task('lint-html', function() {
		return gulp.src('assets/www/index.html')
            .pipe(html5Lint({}));
	});

	gulp.task('lint-html-report', function() {

	});
};