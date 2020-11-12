// Handle Gulp args
const arg = require('./gulp-args');

// Development File Structure
var MAIN_DIR = "";
var AST_DIR = "public/static";

var NEXT_DEV_SASS = "assets/scss/";
var NEXT_DEV_IMG = "assets/img/";

var NEXT_SCSS = NEXT_DEV_SASS + '**/*.scss'
var NEXT_IMG = NEXT_DEV_IMG + '**/*.*'

var PROD_CSS = MAIN_DIR + AST_DIR + "/css";
var PROD_IMG = MAIN_DIR + AST_DIR + "/img";

// Include gulp/gulp plugins
var gulp = require('gulp');
var gulpif = require('gulp-if');
var notify = require('gulp-notify');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

// The value does't matter, if it exist set as true
if (arg.prod != undefined) {
	arg.prod = true;
}

// Set environment var
process.env.NODE_ENV = (arg.prod ? 'production' : 'development');

// Process sass files
gulp.task('build-sass', function() {
	var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var cssmin = require('gulp-cssmin');

	var sassOptions = (arg.prod ? {
		errLogToConsole: true,
		outputStyle: 'compressed',
		sourceComments: false
	} : {
		errLogToConsole: true,
		linefeed: 'lf', // 'lf'/'crlf'/'cr'/'lfcr'
		outputStyle: 'expanded', // 'nested','expanded','compact','compressed'
		sourceComments: false
	})

	return gulp.src(NEXT_SCSS)
	.pipe(sass(sassOptions))
	.pipe(concat((arg.prod ? 'admin-min.css' : 'admin.css')))
	.pipe(gulpif(arg.prod, cssmin()))
	.on("error", notify.onError({
		message: 'Error: <%= error.message %>'
	}))
	.pipe(gulp.dest(PROD_CSS));
});

// Process react files
gulp.task('build-react', function() {
	var browserify = require('browserify');
	var source = require('vinyl-source-stream');
	var gConcat = require('gulp-concat');
	var minifyJS = require('gulp-minify');
	var buffer = require('vinyl-buffer');
	var bundle_name = 'admin.js';

	return browserify({
		entries: ADM_DEV_JSX + 'admin.jsx',
		extensions: ['.jsx'],
		debug: false
	})
	.transform('babelify', {
		presets: ["@babel/preset-env", "@babel/preset-react"]
	})
	.bundle()
	.pipe(source(bundle_name))
	.pipe(buffer())
	.pipe(gulpif(arg.prod, gConcat(bundle_name)))
	.pipe(gulpif(arg.prod, minifyJS()))
	.pipe(browserSync.stream())
	.pipe(gulp.dest(PROD_ADM));
});

// Minify Images
gulp.task('build-images', function() {
	var imagemin = require('gulp-imagemin');
	return gulp.src(NEXT_IMG)
		.pipe(imagemin({
				progressive: true,
				svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest(PROD_IMG));
});

// Watch files
gulp.task('watch', function() {
	gulp.watch(NEXT_SCSS, gulp.series('build-sass'));
});

// Tasks
gulp.task('dev', gulp.series('build-sass', 'build-images', 'watch'));
gulp.task('default', gulp.series('build-sass', 'build-images'));