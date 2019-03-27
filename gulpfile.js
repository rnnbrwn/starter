var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
    return gulp.src('dist/js/script.js')
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
    });

gulp.task('sass', function () {
    return sass('src/sass/main.scss', {
        sourcemap: true,
        style: 'expanded'
    })
    .on('error', function (err) {
        console.error('Error!', err.message);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
    gulp.watch('dist/js/**/*', ['js']);
    gulp.watch(['src/sass/**/*'], ['sass']);
  });
  
  gulp.task('webserver', function() {
      gulp.src('dist/')
          .pipe(webserver({
              livereload: true,
              open: true
          }));
  });
  
  gulp.task('default', ['watch', 'sass','webserver']);
  