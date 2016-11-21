/*eslint no-undef: "off"*/
'use strict';

module.exports = function testTasks(gulp) {

	var Server = require('karma').Server;
	var path = require("path")

	gulp.task('test-js', function testJsTask(done) {
      new Server({
        configFile: path.join(__dirname, '../../', 'karma.conf.js'),
        singleRun: true,
        action: 'watch',
        showStack: true
      }, done).start();
    });
};
