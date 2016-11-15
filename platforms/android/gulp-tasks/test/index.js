module.exports = function (gulp) {

	var Server = require('karma').Server;
	var fs = require('fs');
	var path = require("path")

	gulp.task('test-js', function (done) {
      new Server({
        configFile: path.join(__dirname, '../../', 'karma.conf.js'),
        singleRun: true,
        action: 'watch',
        showStack: true
      }, done).start();
    });
};