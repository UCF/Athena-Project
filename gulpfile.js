var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    bower = require('gulp-bower'),
    rename = require('gulp-rename'),
    scsslint = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    scssPath: './_src',
    cssPath: './assets/css'
};

gulp.task('bower', function() {
    return bower();
});

gulp.task('scss', ['bower'], function() {
    gulp.src(config.scssPath + '/base.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(rename('main.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.cssPath));
});

gulp.task('css', ['scss']);

gulp.task('watch', function() {
    gulp.watch(config.scssPath + '/*.scss', ['css']);
});

gulp.task('default', ['bower', 'scss']);
