'use strict';
const { src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
sass.compiler = require("dart-sass");
const postcss = require('gulp-postcss');
const autoprefixer = require('gulp-autoprefixer');
const mqpacker = require("css-mqpacker");
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
const server = browserSync.create();
const plumber = require('gulp-plumber');

const paths = {
    workFolder: '20210224__development-init/**/*',
    srcFolder: './assets/src/**',
    html: './assets/src/index.html',
    scssAll: './assets/src/**/*.scss',
    scss: './assets/src/style.scss',
    jsAll: './assets/src/js/*.js',
    minjs: './assets/src/js/*.min.js',
    img: './assets/src/images/*.{jpg,jpeg,png,gif,svg}',
    dist: './assets/dist',
    css_dist: './assets/dist/css',
    js_dist: './assets/dist/js',
};

/**
 * src Folderのファイルをコピーして、distに出力
 */
const copyFiles = () => {
    return src(paths.srcFolder, !paths.scssAll)
    .pipe(dest(paths.dist))
}

/**
 * scssファイルをコンパイル
 */
const sassCompile = () => {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss([autoprefixer]))
        .pipe(csscomb())
        .pipe(postcss([mqpacker()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.css_dist))
}

const scripts = () => {
    return src(paths.jsAll, !paths.minjs)
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ extname: '.js' }))
        .pipe(dest(paths.js_dist))
}

/**
 * ローカルサーバーの接続
 */
const startAppserver = () => {
    server.init({
        server: {
            baseDir: paths.dist,
        }
    })
    watch(paths.jsAll, scripts);
    watch(paths.scssAll, sassCompile);
    watch(paths.srcFolder, copyFiles);
    watch(paths.srcFolder).on('change', server.reload);
}

exports.scripts = scripts;
exports.copyFiles = copyFiles;
exports.sassCompile = sassCompile;
exports.serve = startAppserver;