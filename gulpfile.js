'use strict';
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("dart-sass");
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const csscomb = require('gulp-csscomb');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const server = browserSync.create();

const paths = {
    workFolder: '20210224__development-init/**/*',
    srcFolder: './assets/src/**',
    html: './assets/src/index.html',
    scssAll: './assets/src/**/*.scss',
    scss: './assets/src/style.scss',
    jsAll: './assets/src/js',
    img: './assets/src/images/*.{jpg,jpeg,png,gif,svg}',
    dist: './assets/dist',
    css_dist: './assets/dist/css',
};

/**
 * src Folderのファイルをコピーして、distに出力
 */
function copyFiles() {
    return src(paths.srcFolder, !paths.scssAll)
    .pipe(dest(paths.dist))
}

/**
 * scssファイルをコンパイル
 */
function sassCompile() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss([autoprefixer]))
        .pipe(csscomb())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css_dist))
}

/**
 * ローカルサーバーの接続
 */
function startAppserver() {
    server.init({
        server: {
            baseDir: paths.dist,
        }
    })
    watch(paths.scssAll, sassCompile);
    watch(paths.scssAll).on('change', server.reload);
}

exports.copyFiles = copyFiles;
exports.sassCompile = sassCompile;
exports.serve = startAppserver;