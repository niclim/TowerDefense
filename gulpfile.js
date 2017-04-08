var gulp = require("gulp");

var sass = require("gulp-sass");
var browserSync = require("browser-sync").create();
var cssnano = require("gulp-cssnano");

var webpack = require("webpack-stream")

// Sass compiler
gulp.task("sass", function() {
  return gulp.src("src/scss/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("app/css/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Webpack
gulp.task("webpack", function() {
  return gulp.src("src/js/entry.js")
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest("app/js/"))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Browser Sync
gulp.task("browserSync", function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    },
  });
});

// Add tests here

// Default gulp task
gulp.task("default", ["browserSync", "sass", "webpack"], function() {
  gulp.watch("src/scss/**/*.scss", ["sass"]);
  gulp.watch("src/js/**/*.js", ["webpack"]);
  gulp.watch('app/*.html', browserSync.reload);
})
