var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prettyJS = require('gulp-jsbeautifier'),
    stripDebug = require('gulp-strip-debug');

gulp.task('sass', function(){
  gulp.src('src/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(prettyJS())
      .pipe(stripDebug())
      .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['sass', 'watch', 'scripts']);
gulp.task('watch', function(){
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['scripts']);
});
