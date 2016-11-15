'use strict';

var fs = require('fs');
var path = require('path');
var htmlhint = require('gulp-htmlhint');
var eslint = require('gulp-eslint');
var eslintConfig = JSON.parse(fs.readFileSync('./.eslintrc.json'));
var reporter = require('eslint-html-reporter');
var csslint = require('gulp-csslint');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');

csslint.addFormatter('csslint-stylish');

module.exports = function(gulp) {
	gulp.task('lint-html', function() {
		gulp.src('./assets/www/**/*.html')
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.failReporter({ suppress: false }));

        gulp.src('./assets/www/views/**/*.html')
            .pipe(htmlhint('.htmlhintrc'))
            .pipe(htmlhint.failReporter({ suppress: false }));
	});

	gulp.task('es-lint', function() {
        return gulp.src(['./assets/www/**/*.js',
                         '!node_modules/**',
                         '!./assets/www/cordova-js-src/**',
                         '!./assets/www/cordova*.js',
                         '!./assets/www/lib/**',
                         '!./assets/www/plugins/**',
                         '!./assets/www/spec/lib/**'
                         ])
        .pipe(eslint(
            {
				rules: eslintConfig,
				globals: ['jQuery', '$', 'angular'],
                envs: ['browser']
            }
        ))
        .pipe(eslint.formatEach('compact', process.stderr))
        .pipe(eslint.result(function(result) {
              console.log('ESLint result: ' + result.filePath);
              console.log('# Messages: ' + result.messages.length);
              console.log('# Warnings: ' + result.warningCount);
              console.log('# Errors: ' + result.errorCount);
         }))
        .pipe(eslint.format(reporter, function(results) {
                    fs.writeFileSync(path.join(__dirname, 'report-results.html'), results);
                  }))
        .pipe(eslint.failAfterError());
	});

	gulp.task('js-concat', ['js-main', 'js-vendor']);

	gulp.task('js-main', function() {
		gulp.src(['./assets/www/js/*.js', './assets/www/services/*.js', './assets/www/views/**/*.js'])
            .pipe(uglify())
            .pipe(sourcemaps.init())
            .pipe(concat('main.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/js'));
	});

	gulp.task('js-vendor', function() {
        gulp.src(['./assets/www/lib/ionic/ionic.bundle.min.js', './assets/www/lib/lodash/lodash.js'])
            .pipe(uglify())
            .pipe(sourcemaps.init())
            .pipe(concat('vendor.js'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/lib'));
    });

	gulp.task('css-prefix', function() {
		gulp.src(['./assets/www/css/*.css'])
            .pipe(autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            }))
            .pipe(gulp.dest('./assets/www/css'));
	});

	gulp.task('css-lint', function() {
      gulp.src(['./assets/www/css/*.css', '!./assets/www/css/font-awesome.min.css'])
        .pipe(csslint())
        .pipe(csslint.formatter('stylish'))
        .pipe(csslint.formatter('fail'));
    });

    gulp.task('css-concat', ['css-concat-main', 'css-concat-vendor']);

    gulp.task('css-concat-main', function() {
        gulp.src(['./assets/www/css/*.css', '!./assets/www/css/font-awesome.min.css'])
            .pipe(sourcemaps.init())
            .pipe(concat('main.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'));
    });

    gulp.task('css-concat-vendor', function() {
        gulp.src(['./assets/www/css/font-awesome.min.css', './assets/www/lib/ionic/css/ionic.min.css'])
            .pipe(sourcemaps.init())
            .pipe(concat('vendor.css'))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest('dist/css'));
    });
};