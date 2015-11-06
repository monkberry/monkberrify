var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var monkberrify = require('../index');

gulp.task('default', function() {
  gulp.src('app.js')
    .pipe(sourcemaps.init())
    .pipe(browserify({
      transform: [monkberrify],
      debug: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('.'))
});
