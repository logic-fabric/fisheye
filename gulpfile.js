"use strict";

const gulp = require("gulp");

const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");

const ejs = require("gulp-ejs");
const rename = require("gulp-rename");

sass.compiler = require("node-sass");

function watch() {
  gulp.watch("./src/scss/**/*.scss", buildCSS);
  gulp.watch("./src/templates/**/*.ejs", buildTemplates);
}

function buildCSS() {
  return gulp
    .src("./src/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest("./css"));
}

function buildTemplates() {
  return gulp
    .src("./src/templates/*.ejs")
    .pipe(ejs())
    .pipe(rename({ extname: ".html" }))
    .pipe(gulp.dest("."));
}

module.exports.watch = watch;
module.exports.buildCSS = buildCSS;
module.exports.buildTemplates = buildTemplates;
