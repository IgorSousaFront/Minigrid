var gulp    = require('gulp'),
sass        = require('gulp-sass'),
csso        = require('gulp-csso'),
concat      = require('gulp-concat'),
uglify      = require('gulp-uglify'),
fileinclude = require('gulp-file-include');

gulp.task('sass', function () {
  return gulp.src([
    'assets/sass/main.scss',
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(csso())
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./public/css/'));
});

gulp.task('js', function () {
  return gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'bower_components/ifeed/index.js',
    'assets/js/main.js'
  ])
  .pipe(uglify())
  .pipe(concat('main.js'))
  .pipe(gulp.dest('public/js/'));
});

gulp.task('fileinclude', function() {
  gulp.src([
    'index.php'
  ])
  .pipe(fileinclude({
    prefix: '@@',
    indent: true,
    basepath: './'
  }))
  .pipe(gulp.dest('./public/'));
});

gulp.task('default', ['sass', 'js', 'fileinclude'], function() {
  console.log('\n Está trabalhando! \n');
});

gulp.task('watch', ['default'], function () {
  gulp.watch('assets/sass/*.scss', ['sass']);
  gulp.watch('assets/js/*.js', ['js']);
  gulp.watch('*.php', ['fileinclude']);
});