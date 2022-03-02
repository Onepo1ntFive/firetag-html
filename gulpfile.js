'use strict';

const gulp = require('gulp'),
    { series, parallel } = gulp,
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    webp = require('gulp-webp'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    concat = require('gulp-concat'),
    ghPages = require('gulp-gh-pages');

const path = {
    build: { // пути для файлов после сборки
        html: 'build/',
        js: 'build/js/',
        style: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: { // исходные файлы
        html: 'src/*.html',
        js: ['src/js/libs/**/*.js', 'src/js/**/*.js'],
        style: './src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { // типы файлов для наблюдения
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
}

const cleanBuild = (cb) => {
    return rimraf(path.clean, cb);
}

// dev tasks
const server = () => {
    return browserSync
        .init({
            server: {
                baseDir: "./build"
            },
            host: 'localhost',
            port: 9000,
            logPrefix: "build"
        });
}

const html = () => {
    return gulp
        .src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
}

const styles = () => {
    return gulp
        .src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.style))
        .pipe(reload({ stream: true }));
}

const scripts = () => {
    return gulp
        .src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        // .pipe(uglify())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
}

const fonts = () => {
    return gulp
        .src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
}

const imagesWebp = () => {
    return gulp
        .src(path.src.img)
        .pipe(webp({ quality: 80, preset: 'photo' }))
        .pipe(gulp.dest(path.build.img))
}

const imagesDev = () => {
    return gulp
        .src(path.src.img)
        .pipe(gulp.dest(path.build.img))
}

const watch = () => {
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.style, styles)
    gulp.watch(path.watch.js, scripts)
}

// helper tasks
exports.images = series(imagesDev, imagesWebp);

// dev task
exports.dev = series(
    cleanBuild,
    parallel(html, styles, scripts, fonts, imagesDev, imagesWebp),
    parallel(watch, server)
)
// build task
exports.build = series(
    cleanBuild,
    parallel(html, styles, scripts, fonts, imagesDev, imagesWebp)
)

// deploy
const deploy = () => {
    return gulp.src('./build/**/*')
        .pipe(ghPages());
}

exports.deploy = series(
    cleanBuild,
    parallel(html, styles, scripts, fonts, imagesDev, imagesWebp),
    parallel(deploy)
);