const gulp = require('gulp');
const uglify = require('gulp-uglify');


//gulp.task('default');-

gulp.task('default', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minjs'));



});