const gulp = require('gulp');
const uglify = require('gulp-uglify');

//Script task
//uglify
gulp.task('scripts', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

});

//Styles task
gulp.task('styles', function () {
  console.log('style task');
})

//gulp defualt task
//passing multiple tasks names as the array, and all are getting executed
gulp.task('default', ['scripts', 'styles']);