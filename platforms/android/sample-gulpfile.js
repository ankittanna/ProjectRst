'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    gulpUtil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    karma = require('gulp-karma'),
    preprocess = require('gulp-preprocess'),
    connect = require('gulp-connect'),
    rimraf = require('gulp-rimraf'),
    hl = require('highland'),
    rjs = require('requirejs'),
    resourcePipeline = require('connect-resource-pipeline'),
    modrewrite = require('connect-modrewrite'),
    jscs = require('gulp-jscs'),
    argv = require('yargs').argv,
    lintspaces = require('gulp-lintspaces'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    stubServer = require('gulp-develop-server'),
    buildTime = require('moment')(),
    lintConfig = {
        editorconfig: '.editorconfig'
    };

function getVersionNumber() {
    return /SNAPSHOT/.test(argv.ver) ? argv.ver + buildTime.format('[-]YYYYMMDD[-]HHmmss') : argv.ver;
}

gulp.task('connect', function () {
    var extRes = !!argv.EXT_RES,
        startProxy = !!argv.PROXY_SERVER;

    connect.server({
        root: 'app',
        livereload: {
            port: 123456
        },
        port: 1337,
        middleware: function (connect) {
            return [
                connect()
                    .use(modrewrite(['^/?(\\?(.*))?$ /index.html?$2', '^/cbs-inventory-web/secure/inventoryView/(.*)$ /$1']))
                    .use(resourcePipeline({root: 'app'}, [{
                        url: '/index.html',
                        factories: [preprocess.bind(null, {context: {DEV: true, EXT_RES: extRes}})]
                    }, {
                        url: '/',
                        factories: [preprocess.bind(null, {context: {DEV: true, EXT_RES: extRes}})]
                    }, {
                        url: '/scripts/main.js',
                        factories: [preprocess.bind(null, {context: {DEV: true, EXT_RES: extRes}})]
                    }]))
            ];
        }
    });

    if (startProxy) {
        stubServer.listen( { path: 'node_modules/cbs-common-proxyserver/stub-server/stub-server.js' } );
    }
});

gulp.task('clean-js', function () {
    return gulp.src(['dist/scripts/*'])
        .pipe(rimraf());
});

gulp.task('check-formatting-js', function () {
    return gulp.src(['app/scripts/**/*.js', 'test/**/*.spec.js'])
        .pipe(jscs());
});

gulp.task('js-hint', function () {
    return gulp.src(['app/scripts/**/*.js', 'test/**/*.spec.js', 'Gulpfile.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('test-js', ['js-hint'], function () {
    return gulp.src('./no-file')
        .pipe(karma({
            configFile: argv.DEBUG ? 'build-config/karma.conf.debug.js' : 'build-config/karma.conf.js',
            action: argv.DEBUG ? 'watch' : 'run'
        }));
});

gulp.task('test-watch', function () {
    watch(['app/scripts/**/*.js', 'test/**/*.spec.js'], function () {
        karma({
            configFile: 'build-config/karma.conf.debug.js',
            action: 'run'
        });
    });
});

gulp.task('build-js', ['clean-js', 'check-formatting-js', 'js-hint'], function (done) {
    // Getting some sass from gulp-requirejs so wrapping it ourselves using highland stream library.
    // Initial call to gulp.src gets a list of modules we need to explicitly require otherwise the optimizer will miss them.
    var plugins = ['plugins/router', 'plugins/dialog'];

    function build(explicitModules) {
        var versionNumber = getVersionNumber();

        return hl(function (push, next) {
            function callback(text) {
                push(null, new gulpUtil.File({
                    path: 'main.js',
                    contents: new Buffer(text)
                }));
                push(null, hl.nil);
                next();
            }

            //optimize to one file using rjs optimizer
            var rjsConfig = {
                mainConfigFile: 'app/scripts/main.js',
                name: 'main',
                baseUrl: 'app/scripts',
                include: explicitModules,
                out: callback,
                optimize: 'none',
                paths: {
                    'globals-json': 'empty:',
                    'permissions-json': 'empty:',
                    'appConfig-json': 'empty:'
                }
            };
            rjs.optimize(rjsConfig);
        })
            .pipe(preprocess({context: {DEV: false}}))
            .pipe(rename(function (path) {
                if (path.extname) {
                    path.basename += '-v' + versionNumber;
                }
            }))
            .pipe(replace(/(define\('main)(')/, '$1-v' + versionNumber + '$2'))
            .pipe(gulp.dest('dist/scripts/'))
            .pipe(connect.reload())
            .on('end', done);
    }

    return gulp.src('app/scripts/**/*.html')
        .pipe(hl())
        .map(function (file) {
            return 'text!' + file.relative;
        })
        .concat(gulp.src('app/scripts/viewmodules/**/*.js')
            .pipe(hl())
            .map(function (file) {
                return 'viewmodules/' + file.relative.match(/(.*)\.js/)[1];
            }))
        .toArray(function (viewsAndViewmodels) {
            build(viewsAndViewmodels.concat(plugins));
        });
});

gulp.task('clean-html', function () {
    return gulp.src(['dist/WEB-INF/views/secure/*'])
        .pipe(rimraf());
});

gulp.task('build-html', ['clean-html'], function () {
    return gulp.src('app/index.html')
        .pipe(preprocess({context: {DEV: false, LOCAL: false, VERSION: getVersionNumber()}}))
        .pipe(gulp.dest('dist/WEB-INF/views/secure/'));
});

gulp.task('clean-vendor', function () {
    return gulp.src(['dist/vendor/*'])
        .pipe(rimraf());
});

gulp.task('lint-html', function() {
    return gulp.src(['app/index.html', 'app/scripts/**/*.html'])
        .pipe(lintspaces(lintConfig))
        .pipe(lintspaces.reporter())
        .on('error', function () {
            process.exit(1);
        });
});

gulp.task('lint-html-report', function() {
    return gulp.src(['app/index.html', 'app/scripts/**/*.html'])
        .pipe(lintspaces(lintConfig))
        .pipe(lintspaces.reporter());
});

gulp.task('copy-styles', ['clean-vendor'], function () {
    return gulp.src(['app/bower_components/cbs-inventory-view-style/dist/**', 'app/favicon.ico'])
        .pipe(rename(function (path) {
            if (path.extname === '.css') {
                path.basename += '-v' + getVersionNumber();
            }
        }))
        .pipe(gulp.dest('dist/vendor/'));
});

gulp.task('copy-js', ['clean-vendor'], function () {
    return gulp.src([
        'app/bower_components/requirejs/require.js',
        'app/bower_components/modernizer/modernizr.js',
        'app/bower_components/cbs-common-web-logging/dist/logging-lib.js'
    ])
        .pipe(rename(function (path) {
            if (path.extname) {
                path.basename += '-v' + getVersionNumber();
            }
        }))
        .pipe(gulp.dest('dist/vendor/js/'));
});

gulp.task('watch', function () {
    gulp.watch(['app/index.html', 'app/scripts/**/*.html'], ['lint-html-report']);
    gulp.watch('app/**/*.html', function () {
        connect.reload();
    });
    gulp.watch(['app/scripts/**/*.js', 'test/**/*.js'], ['build-js']);
});

gulp.task('copy-assets', ['copy-styles', 'copy-js']);

gulp.task('build', ['copy-assets', 'build-js', 'lint-html', 'build-html']);

gulp.task('test', ['test-js']);

gulp.task('serve', ['build', 'test', 'connect', 'watch']);

gulp.task('serve-no-watch', ['build', 'test', 'connect']);

gulp.task('serve-no-test', ['build', 'connect', 'watch']);

gulp.task('default', ['build-js', 'test-js', 'build-html']);
