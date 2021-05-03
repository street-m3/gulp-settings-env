'use strict';
const { src, dest, watch } = require('gulp');
const sass          = require('gulp-sass');
      sass.compiler = require("dart-sass");
const postcss       = require('gulp-postcss');
const autoprefixer  = require('gulp-autoprefixer');
const mqpacker      = require("css-mqpacker");
const csscomb       = require('gulp-csscomb');
const rename        = require('gulp-rename');
const uglify        = require('gulp-uglify');
const sourcemaps    = require('gulp-sourcemaps');
const browserSync   = require('browser-sync');
const server        = browserSync.create();
const plumber       = require('gulp-plumber');

const paths = {
    working: {
        src:    '20210224__development-init/**/*',
        dist:   './assets/dist',
        develop:'./assets/src/**',
    },
    html: {
        src:  './assets/src/*.html',
        dist: './assets/dist'
    },
    styles: {
        src:  './assets/src/**/*.scss',
        main: './assets/src/style.scss',
        dist: './assets/dist/css',
    },
    scripts: {
        src:    './assets/src/js/*.js',
        dist:   './assets/dist/js',
        minify: './assets/src/js/*.min.js',
    },
    images: {
        src: './assets/src/images/*.{jpg,jpeg,png,gif,svg}',
        dist:   './assets/dist/images',
    }
}

/**
 * src Folderのファイルをコピーして、distに出力
 */
const copyFiles = () => {
    return src(paths.working.develop, !paths.styles.src, !paths.scripts.src)
    .pipe(dest(paths.working.dist))
}

/**
 * scssファイルをコンパイル
 */
const sassCompile = () => {
    return src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(postcss([autoprefixer]))
        .pipe(csscomb())
        .pipe(postcss([mqpacker()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dist))
}

const scripts = () => {
    return src(paths.scripts.src, !paths.scripts.minify)
        // .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({ extname: '.js' }))
        .pipe(dest(paths.scripts.dist))
}

/**
 * ローカルサーバーの接続
 */
const startAppserver = () => {
    server.init({
        server: {
            baseDir: paths.working.dist,
        }
    })
    watch(paths.styles.src, sassCompile);
    watch(paths.scripts.src, scripts);
    watch(paths.working.develop, copyFiles);
    watch(paths.working.develop).on('change', server.reload);
}

exports.scripts = scripts;
exports.copyFiles = copyFiles;
exports.sassCompile = sassCompile;
exports.serve = startAppserver;