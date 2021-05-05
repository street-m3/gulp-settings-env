'use strict';
const { src, dest, watch } = require('gulp');
const notify        = require('gulp-notify');
const htmlhint      = require('gulp-htmlhint');
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
// images
const imagemin         = require('imagemin');
const imageminMozjpeg  = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo     = require('imagemin-svgo');

const paths = {
    working: {
        src:     '20210224__development-init/**/*',
        dist:    './assets/dist',
        develop: './assets/src/**',
    },
    html: {
        dir:  '',
        src:  './assets/src/*.html',
        dist: './assets/dist'
    },
    styles: {
        dir:  './assets/src/scss/',
        src:  './assets/src/**/*.scss',
        main: './assets/src/style.scss',
        dist: './assets/dist/css',
    },
    scripts: {
        dir:    './assets/src/js',
        src:    './assets/src/js/*.js',
        dist:   './assets/dist/js',
        minify: './assets/src/js/*.min.js',
    },
    images: {
        src: './assets/src/images/**',
        dist:   './assets/dist/images',
    }
}

/**
 * @returns HTMLフォーマットする
 */
const htmlFormat = () => {
    return src(paths.html.src)
        .pipe(
            plumber({
                errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        )
        .pipe(htmlhint())
        .pipe(htmlhint.reporter())
        .pipe(dest(paths.html.dist))
}

/**
 * @returns 
 * src Folderのファイルをコピーして、distに出力 (基本使わない)
 */
// const copyFiles = () => {
//     return src(paths.working.develop, !paths.styles.src, !paths.scripts.src)
//     .pipe(dest(paths.working.dist))
// }

/**
 * @returns scssファイルをコンパイル
 */
const sassCompile = () => {
    return src(paths.styles.main)
        .pipe(
            plumber({
            errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        )
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded'
            })
        )
        .pipe(postcss([autoprefixer]))
        .pipe(csscomb())
        .pipe(postcss([mqpacker()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.styles.dist))
}
/**
 * @returns 
 */
const scripts = () => {
    return src(paths.scripts.src, !paths.scripts.minify)
        .pipe(
            plumber({
            errorHandler: notify.onError("Error: <%= error.message %>"),
            })
        )
        .pipe(uglify())
        // .pipe(rename({ extname: '.min.js' }))
        .pipe(dest(paths.scripts.dist))
}

const imagesCompress = () => {
    return src(paths.images.src)
        // .pipe(
        //     plumber({
        //         errorHandler: notify.onError("Error: <%= error.message %>"),
        //     })
        // )
        // .pipe(
        //     imagemin(
        //         [
        //             imageminMozjpeg({
        //                 quality: 80
        //             }),
        //             imageminPngquant({
        //                 quality: [.70, .80], // 画質
        //                 speed: 1 // スピード
        //             }),
        //             imageminSvgo(),
        //             imageminGifsicle({ optimizationLevel: 3 }) // 圧縮率
        //         ]
        //     )
        // )
    .pipe(dest(paths.images.dist))
}

/**
 * ローカルサーバーの接続
 */
const startAppserver = () => {
    server.init({
        notify: false,
        server: {
            baseDir: paths.working.dist,
        }
    })
    watch(paths.html.src, htmlFormat)
    watch(paths.styles.src, sassCompile);
    watch(paths.scripts.src, scripts);
    // watch(paths.working.develop, copyFiles);
    watch(paths.images.src, imagesCompress);
    watch([paths.html.src, paths.styles.src, paths.scripts.src, paths.images.src]).on('change', server.reload);
}

// exports.copyFiles = copyFiles;
exports.htmlFormat = htmlFormat;
exports.sassCompile = sassCompile;
exports.imagesCompress = imagesCompress;
exports.scripts = scripts;
exports.serve = startAppserver;