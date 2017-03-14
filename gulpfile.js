const gulp = require('gulp');
const stylus = require('gulp-stylus');
const nib = require('nib');
const myth = require('gulp-myth'); // Плагин для префиксов CSS
const csso = require('gulp-csso'); // Минификация CSS
const uglify = require('gulp-uglify'); // Минификация JS
const concat = require('gulp-concat'); // Склейка файлов
const del = require('del');

const config = {
    clean: {
        selector: ['./dist/**', '!./dist']
    },
    js: {
        source: ['./src/**/*.js'],
        build: './dist/',
        devName: 'navbar.js',
        minName: 'navbar.min.js'
    },
    stylus: {
        source: ['./src/**/*.styl'],
        build: './dist/',
        devName: 'navbar.css',
        minName: 'navbar.min.css'
    },
};

gulp.task('clean', () =>
    del(config.clean.selector, { force: true, dryRun: true })
);

gulp.task('js', () => {
    gulp.src(config.js.source)
        .pipe(concat(config.js.devName))
        .pipe(gulp.dest(config.js.build))
});

gulp.task('js-min', () => {
    gulp.src(config.js.source)
        .pipe(uglify())
        .pipe(concat(config.js.minName))
        .pipe(gulp.dest(config.js.build))
});

gulp.task('stylus', () => {
    gulp.src(config.stylus.source)
        .pipe(stylus({ use: nib() }))
        .pipe(myth())
        .pipe(concat(config.stylus.devName))
        .pipe(gulp.dest(config.stylus.build))
});

gulp.task('stylus-min', () => {
    gulp.src(config.stylus.source)
        .pipe(stylus({ use: nib() }))
        .pipe(myth())
        .pipe(csso())
        .pipe(concat(config.stylus.minName))
        .pipe(gulp.dest(config.stylus.build))
});

gulp.task('watch', ['js', 'stylus'], () => {
    gulp.watch(config.js.source, ['js']);
    gulp.watch(config.stylus.source, ['stylus']);
});

gulp.task('build', ['clean', 'js', 'js-min', 'stylus', 'stylus-min']);
gulp.task('default', ['clean', 'watch']);