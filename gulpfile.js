'use strict';

var gulp = require('gulp');
var server = require('browser-sync').create();

gulp.task('start', function () {
  server.init({
    server: {
      index: 'index.html'
    },
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/js/*.js', gulp.series('refresh'));
  gulp.watch('source/*.html', gulp.series('refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});
