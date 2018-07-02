const gulp = require('gulp');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const webp = require('gulp-webp');


//Script task
//uglify
gulp.task('scripts', function () {
  gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

});

//Watch task
gulp.task('watch', function () {
  gulp.watch('js/*.js', ['scripts']);
});

//Styles task
gulp.task('styles', function () {
  console.log('style task');
});

//Image task
gulp.task('image', function () {
  gulp.src('img/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
      quality: 75
    })]))
    .pipe(gulp.dest('build/img'))
});


gulp.task('webp-lossless', () =>
  gulp.src('img/*.jpg')
    .pipe(webp({
      lossless: false,
      quality: 75
    }))
    .pipe(gulp.dest('build/img'))
);


//gulp defualt task
//passing multiple tasks names as the array, and all are getting executed
gulp.task('default', ['scripts', 'styles', 'image', 'watch']);