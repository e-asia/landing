// Include gulp.
var gulp = require('gulp');
var config = require('./config.json');

// Include plugins.
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefix = require('gulp-autoprefixer');
var glob = require('gulp-sass-glob');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var plumber = require('gulp-plumber');


gulp.src('./src/*.scss')
.pipe(plumber())
.pipe(sass())
.pipe(uglify())
.pipe(plumber.stop())
.pipe(gulp.dest('./dist'));
// CSS.
gulp.task('css', function() {
  return gulp.src(config.css.src)
  .pipe(glob())
  .pipe(sourcemaps.init())
  .pipe(sass({
    style: 'compressed',
    errLogToConsole: true
  }))
  .pipe(concat(config.css.file))
  .pipe(autoprefix('last 2 versions', '> 1%', 'ie 9', 'ie 10'))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.css.dest))
  .pipe(browserSync.stream({ stream: true }));
});

// Concat js
gulp.task('js', function() {
  return gulp.src(config.js.src)
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(concat(config.js.file))
  .pipe(uglify())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest(config.js.dest))
  .pipe(browserSync.stream({ stream: true }));
});

// Twig.
gulp.task('twig', function() {
  return gulp.src(config.twig.src)
  .pipe(browserSync.reload({ stream: true }));
});


// Watch task.
gulp.task('watch', function() {
  gulp.watch(config.css.src, ['css']).on('change',browserSync.reload);
  gulp.watch(config.js.src, ['js']).on('change',browserSync.reload);
  gulp.watch(config.twig.src, ['twig']).on('change',browserSync.reload);
  browserSync.init({
    proxy: "localhost"
  });
  browserSync.reload();
});

// Default Task
gulp.task('default', ['watch']);