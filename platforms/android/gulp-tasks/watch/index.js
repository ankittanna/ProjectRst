/*eslint no-unused-vars: "off"*/
'use strict';

var watch = require('gulp-watch');
var connect = require('gulp-connect');
var gulpConfig = require('../config/index.js');

module.exports = function watchTasks(gulp) {

    gulp.task('watch', function watchTask() {
        gulp.watch(gulpConfig.watch.html, [ 'lint-html' ]);
        gulp.watch(gulpConfig.watch.js,[ 'build-js', 'test-js' ]);
        gulp.watch(gulpConfig.watch.css, [ 'css-prefix', 'css-lint', 'css-concat' ]);
    });
};
