var gulp    = require('gulp'),
sass        = require('gulp-sass'),
csso        = require('gulp-csso'),
concat      = require('gulp-concat'),
uglify      = require('gulp-uglify'),
fileinclude = require('gulp-file-include'),
sync        = require ('browser-sync');

gulp.task('serverRun', function() {
    sync.init({
        proxy: "localhost/projetos/minigrid/dist/"
    });
});

gulp.task('sass', function () {
  return gulp.src([
    'assets/sass/main.scss',
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(csso())
  .pipe(gulp.dest('./dist/css/'))
  .pipe(sync.stream());
});

gulp.task('js', function () {
  return gulp.src([
  ])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('dist/js/'))
  .pipe(sync.stream());
});

gulp.task('fileinclude', function() {
  gulp.src([
    'index.html'
  ])
  .pipe(fileinclude({
    prefix: '@@',
    indent: true,
    basepath: './'
  }))
  .pipe(gulp.dest('./dist/'))
  .pipe(sync.stream());
});

gulp.task('default', ['sass', 'js', 'fileinclude', 'serverRun'], function() {
  console.log('\n EstÃ¡ trabalhando! \n');
});

gulp.task('watch', ['default'], function () {
  gulp.watch('assets/sass/*.scss', ['sass']);
  gulp.watch('assets/js/*.js', ['js']);
  gulp.watch('*/*', ['serverRun']);
  gulp.watch('components/*.php', ['fileinclude']);
  gulp.watch('*.php', ['fileinclude']);
});