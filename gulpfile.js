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

var tsProject = ts.createProject('./app/src/tsconfig.json');

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
    gulp.src('./app/src/directives/ng2-notify.scss')
		.pipe(sass().on('error', sass.logError))
        .pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('./dist/css'));
        
    gulp.src('./app/src/directives/ng2-notify.scss')
		.pipe(gulp.dest('./dist/css'));
        
	return gulp.src('./app/sass/main.scss')
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
	return gulp.src('./app/src/directives/ng2-notify.scss')
		// .pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('index', function() {
    return gulp.src('./app/examples/index.html')
        .pipe(gulp.dest('./public'))
        .pipe(
            browserSync.reload({
                stream: true
            }));
});

gulp.task('templates', function () {
    return gulp.src('./app/examples/**/*.tpl.html')
        .pipe(gulp.dest('./public'))
})

gulp.task('assets', function () {
    return gulp.src('./app/examples/assets/**/*')
        .pipe(gulp.dest('./public/assets'))
})

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['app/**/*.ts'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('public')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
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
        'node_modules/angular2/bundles/angular2-polyfills.js',
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

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./app/**/index.html', ['index']);
    gulp.watch('./app/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.scss', ['sass']);
});