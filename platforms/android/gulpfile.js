var build = require('./gulp-tasks/build');
var serve = require('./gulp-tasks/serve');
var test = require('./gulp-tasks/test');
var watch = require('./gulp-tasks/watch');
var gulp = require('gulp');

gulp.task('watch', watch);
gulp.task('build', build);
gulp.task('test', test);
gulp.task('serve', serve);
