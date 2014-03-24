var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('test', function () {
  gulp.src('test/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish))
    .pipe(mocha({reporter: 'spec'}));
});
