"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

function watch() {
  gulp.watch("./css/scss/**/*.scss", buildCSS);
}

function buildCSS() {
  return gulp
    .src("./css/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./css"));
}

function compressImages() {
  gulp
    .src("img/src/resized_src/*/*.jpg")
    .pipe(imagemin([imagemin.mozjpeg({ quality: 60, progressive: true })]))
    .pipe(gulp.dest("img"));
}

module.exports.watch = watch;
module.exports.buildCSS = buildCSS;
module.exports.compressImages = compressImages;
