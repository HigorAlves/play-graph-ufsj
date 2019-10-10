var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');

gulp.task('compress', function(cb) {
  pump([gulp.src('public/js/*.js'), uglify(), gulp.dest('public/js-min')], cb);
});
