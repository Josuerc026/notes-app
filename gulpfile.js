var gulp = require('gulp'),
    sass = require('gulp-sass'),
    pretty = require('gulp-jsbeautifier'),
    stripDebug = require('gulp-strip-debug');

gulp.task('sass', function(){
  gulp.src('src/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
});

gulp.task('styles',function(){
  gulp.src('dist/css/*.css')
      .pipe(pretty())
      .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function(){
  gulp.src('src/js/*.js')
      .pipe(stripDebug())
      .pipe(pretty())
      .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', ['sass', 'watch', 'scripts', 'styles']);
gulp.task('watch', function(){
  gulp.watch('src/css/*.scss', ['sass']);
  gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('dist/css/*.css', ['styles']);
});
