var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var monkberrify = require('../index');

gulp.task('default', function() {
  gulp.src('app.js')
    .pipe(browserify({
      transform: [monkberrify],
      debug: true
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('.'))
});
