var gulp = require('gulp');
var ts = require('gulp-typescript');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var merge = require('merge2');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var del = require('del');
var uglify = require('gulp-uglify')
var runSequence = require('gulp-run-sequence');
var clean = require('gulp-clean');
var ghPages = require('gulp-gh-pages');

var tsProject = ts.createProject('tsconfig.json');

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

// Error reporting function
// function mapError(err) {
//     if (err.fileName) {
//         // Regular error
//         gUtil.log(chalk.red(err.name) + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', '')) + ': ' + 'Line ' + chalk.magenta(err.lineNumber) + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column) + ': ' + chalk.blue(err.description));
//     } else {
//         // Browserify error..
//         gUtil.log(chalk.red('Browserify ' + err.name) + ': ' + chalk.yellow(err.message));
//     }
// }

gulp.task('sass', function() {
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
    return gulp.src('./app/index.html')
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

gulp.task('copy-external-modules', function() {
    return gulp.src([
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.js',
        // 'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.min.js',
        'node_modules/systemjs/dist/system-polyfills.js'
        ])
        .pipe(gulp.dest('public/lib'))
});

gulp.task('compile-ts-dist', function() {
  var tsResult = gulp.src(['app/src/**/*.ts'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('pubic/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/src'))
  ]);
});

gulp.task('dist', ['compile-ts-dist'], function() {
    return gulp.src(['app/src/**/*.{js,ts}'])
    .pipe(gulp.dest('dist'));
});

gulp.task('compile-ts', function() {
  var tsResult = gulp.src(['app/**/*.ts'])
                  .pipe(plumber())
                  .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('pubic/definitions')),
      tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public'))
  ]);
});

gulp.task('compile-ts-component', function() {
  var tsResult = gulp.src(['app/src/**/*.ts'])
                  .pipe(plumber())
                //   .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('pubic/definitions')),
      tsResult.js
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
  ]);
});

gulp.task('compile-ts-min', function() {
  var tsResult = gulp.src(['./app/src/**/*.ts', '!node_modules/**/*.*', '!build/**/*.*'])
                  .pipe(plumber())
                //   .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

        //   return tsResult.js
		// 		// .pipe(concat('output.js')) 
		// 		.pipe(sourcemaps.write()) 
		// 		.pipe(gulp.dest('dist/js'));
  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
    //   tsResult.dts.pipe(gulp.dest('dist/definitions')),
      tsResult.js
        .pipe(concat('ng2-notify.js'))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('.tmp'))
  ]);
});

gulp.task('compile-component-min', function() {
  var tsResult = gulp.src(['dist/ng2-notify.ts', 'app/src/**/ng2-notify.ts'])
                  .pipe(plumber())
                //   .pipe(sourcemaps.init())
                  .pipe(ts(tsProject));

        //   return tsResult.js
		// 		// .pipe(concat('output.js')) 
		// 		.pipe(sourcemaps.write()) 
		// 		.pipe(gulp.dest('dist/js'));
  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations are done.
      tsResult.dts.pipe(gulp.dest('dist/definitions')),
      tsResult.js
        .pipe(concat('ng2-notify.js'))
        // .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
    //   tsResult.js
    //     .pipe(concat('ng2-notify.js'))
    //     // .pipe(sourcemaps.write('./'))
    //     .pipe(gulp.dest('.tmp'))
  ]);
});

gulp.task('compress', ['compile-component-min'], function() {
  return gulp.src('.tmp/ng2-notify.js')
    .pipe(uglify())
    .pipe(gulp.dest('public'))
    .pipe(gulp.dest('dist'));
});

gulp.task('github-page', function() {
    gulp.src(['src/index.html'])
    .pipe(
        replace("<base href=\"/\">", "<base href=\"/ng2-notify/\">")
    )
    .pipe(gulp.dest('public/index.html'));
    
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});

gulp.task('copy-dist', function() {
    return gulp.src('dist/ng2-notify.ts')
    .pipe(gulp.dest('public/dist'));
});

gulp.task('watch', ['copy-external-modules', 'compile-ts', 'templates', 'sass', 'assets', 'index'], function() {
    startBrowserSync();
    gulp.watch('./app/**/index.html', ['index']);
    gulp.watch('./app/**/*.tpl.html', ['templates']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.ts', ['compile-ts']).on('change', browserSync.reload);
    gulp.watch('./app/**/*.scss', ['sass']);
});

gulp.task('dev', ['copy-external-modules', 'compress', 'sass', 'sass-component', 'assets', 'index'], function() {
    return true;
    // return gulp.src('.tmp')
	// 	.pipe(clean());
});