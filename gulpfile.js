var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var replace = require('gulp-replace');
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var ghPages = require('gulp-gh-pages');
var del = require('del');
var minifyCss = require('gulp-minify-css');

var KarmaServer = require('karma').Server;
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var exec = require('child_process').exec;
var gp = require('gulp-protractor');
var protractor = gp.protractor;
var join = require('path').join;
var concat = require('gulp-concat');

var tsProject = ts.createProject('./src/app/tsconfig.json');

function startBrowserSync() {
    browserSync({
        server: {
            baseDir: './public'
        },
        notify: false,
        ghostMode: {
            clicks: true,
            forms: true,
            scroll: true
        }
    });
}

gulp.task('sass', function() {
    gulp.src('./src/app/directives/ng2notify.scss')
		.pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));

	return gulp.src('./src/sass/main.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./public/css'))
		.pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('sass-component', function() {
	return gulp.src('./src/app/directives/ng2-notify.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('index', function() {
    return gulp.src('./src/examples/index.html')
        .pipe(gulp.dest('./public'))
        .pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('templates', function () {
    return gulp.src('./src/examples/**/*.tpl.html')
        .pipe(gulp.dest('./public'))
})

gulp.task('assets', function () {
    return gulp.src('./src/examples/assets/**/*')
        .pipe(gulp.dest('./public/assets'))
})

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['src/**/*.ts'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('public')),
      tsResult.js
        .pipe(sourcemaps.write('./', {
					sourceRoot: __dirname + '/src'
				}))
        .pipe(gulp.dest('public'))
  ]);
});

gulp.task('github-page', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('copy-dist', function() {
    return gulp.src('dist/ng2-notify.ts')
    .pipe(gulp.dest('public/dist'));
});

gulp.task('copy-external-modules', function() {
    del.sync(['public/**']);
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.min.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js',
        'node_modules/angular2/bundles/http.min.js',
        'node_modules/systemjs/dist/system-polyfills.js'
        ])
        .pipe(gulp.dest('public/lib'))
});

gulp.task('test:e2e', function() {
  // startBrowserSync();
  var args = ['--baseUrl', 'http://127.0.0.1:3000'];
  return gulp.src(["./src/**/*.e2e.ts"])
    .pipe(protractor({
      configFile: "protractor.conf.js",
      action: 'run',
      args: args
    })
    ).on('end', function(c) {
      process.exit();
    });
});

gulp.task('test:unit', function (done) {
	new KarmaServer({
		configFile: __dirname + '/karma.conf.js',
		autoWatch: true,
    singleRun: false
	}).start();
});

gulp.task('remap-coverage', ['test:unit'], function() {
	return exec('node_modules/.bin/remap-istanbul -i coverage/coverage-final.json -o coverage -t html');
});

gulp.task('watch:test', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./src/**/index.html', ['index', 'test:e2e']);
    gulp.watch('./src/**/*.tpl.html', ['templates', 'test:e2e']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.ts', ['compile-ts', 'remap-coverage', 'test:e2e']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.scss', ['sass', 'test:e2e']);
});

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./src/**/index.html', ['index']);
    gulp.watch('./src/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
    gulp.watch('./src/**/*.scss', ['sass']);
});