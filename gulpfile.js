"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

const ejs = require("gulp-ejs");
const rename = require("gulp-rename");

const imagemin = require("gulp-imagemin");

sass.compiler = require("node-sass");

function watch() {
  gulp.watch("./css/scss/**/*.scss", buildCSS);
  gulp.watch("./templates/**/*.ejs", buildTemplates);
}

function buildCSS() {
  return gulp
    .src("./css/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./css"));
}

function buildTemplates() {
  return gulp
    .src("./templates/*.ejs")
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("."));
}

function compressImages() {
  gulp
    .src("img/src/*/*.jpg")
    .pipe(imagemin([imagemin.mozjpeg({ quality: 60, progressive: true })]))
    .pipe(gulp.dest("img"));
}

module.exports.watch = watch;
module.exports.buildCSS = buildCSS;
module.exports.buildTemplates = buildTemplates;
module.exports.compressImages = compressImages;
