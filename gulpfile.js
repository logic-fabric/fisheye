"use strict";

const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require("node-sass");

function watchSCSS() {
  gulp.watch("./css/scss/**/*.scss", makeCSS);
}

function makeCSS() {
  return gulp
    .src("./css/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(gulp.dest("./css"));
}

module.exports.watchSCSS = watchSCSS;
module.exports.makeCSS = makeCSS;
