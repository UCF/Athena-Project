var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-clean-css'),
    bower = require('gulp-bower'),
    rename = require('gulp-rename'),
    scsslint = require('gulp-scss-lint'),
    autoprefixer = require('gulp-autoprefixer');

var config = {
    scssPath: './_src',
    cssPath: './assets/css',
    srcFontPath: './bower_components/athena-framework/dist/fonts',
    distFontPath: './assets/fonts'
};

gulp.task('bower', function() {
    return bower();
});

gulp.task('move-components-font-sans-serif', ['bower'], function() {
  return gulp.src([config.srcFontPath + '/ucf-sans-serif-alt/*'])
    .pipe(gulp.dest(config.distFontPath + '/ucf-sans-serif-alt'));
});

gulp.task('move-components-font-condensed', ['bower'], function() {
  return gulp.src([config.srcFontPath + '/ucf-condensed-alt/*'])
    .pipe(gulp.dest(config.distFontPath + '/ucf-condensed-alt'));
});

gulp.task('move-components-font-slab-serif', ['bower'], function() {
  return gulp.src([config.srcFontPath + '/tulia/*'])
    .pipe(gulp.dest(config.distFontPath + '/tulia'));
});

gulp.task('move-components-fonts', [
  'move-components-font-sans-serif',
  'move-components-font-condensed',
  'move-components-font-slab-serif'
]);

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

gulp.task('default', ['bower', 'move-components-fonts', 'scss']);
