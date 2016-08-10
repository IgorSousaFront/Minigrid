var gulp    = require('gulp'),
sass        = require('gulp-sass'),
csso        = require('gulp-csso'),
concat      = require('gulp-concat')

gulp.task('sass', function () {
  return gulp.src([
    'assets/sass/minigrid.scss',
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./dist/css/'));
});

gulp.task('default', ['sass']);

gulp.task('watch', ['default'], function () {
  gulp.watch('assets/sass/*.scss', ['sass']);
});