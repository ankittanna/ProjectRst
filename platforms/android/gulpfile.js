var gulp = require('gulp');

var watch = require('./gulp-tasks/watch')(gulp);
var build = require('./gulp-tasks/build')(gulp);
var test = require('./gulp-tasks/test')(gulp);
var serve = require('./gulp-tasks/serve')(gulp);
