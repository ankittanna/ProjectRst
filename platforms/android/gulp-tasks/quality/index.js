'use strict';

var htmlhint = require('gulp-htmlhint');

module.exports = function(gulp) {
	gulp.task('lint-html', function() {
		gulp.src("./assets/**/*.html")
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.failReporter({ suppress: false }));
	});

	gulp.task('lint-html-report', function() {

	});
};