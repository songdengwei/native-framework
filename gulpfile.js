var gulp  = require('gulp');
var gulpIf = require('gulp-if');
var watch = require('gulp-watch');  //watch files
var uglify = require('gulp-uglify-cli');    //minify js
var cleanCSS = require('gulp-clean-css');   //minify css
var htmlmin = require('gulp-htmlmin');    //压缩html；
var imagemin = require('gulp-imagemin');   //压缩图片；
var concat = require('gulp-concat');    //合并文件

var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var _ = require('lodash');
var constants = require('./environment/gulpConstants')();

//定义监控事件
gulp.task('styleWatch', ['style'], function() {
    browserSync.reload();
    });
    gulp.task('htmlWatch', ['html'], function() {
        browserSync.reload();
    });
    gulp.task('imgWatch', ['img'], function() {
        browserSync.reload();
    });
    gulp.task('jsWatch', ['js'], function() {
        browserSync.reload();
    });
    gulp.task('indexWatch', ['index'], function() {
        browserSync.reload();
    });
    gulp.task('fontWatch', ['font'], function() {
        browserSync.reload();
    });

//在浏览器上面运行
gulp.task('serve', [argv.release ? 'dist' : 'filesWatch'], function() {
    browserSync.init({
        server: constants.browser.server,
        host: constants.browser.host,
        port: argv.port || constants.browser.port,
        https: constants.browser.https,
        ghostMode: false,
        logPrefix: constants.browser.logPrefix,
        open: _.isUndefined(argv.open) ? true : argv.open,
        notify: _.isUndefined(argv.notify) ? true : argv.notify
    });
});

//生成压缩文件
gulp.task('dist', ['style', 'font', 'img', 'html', 'index', 'js']);
    gulp.task('style', function(){
        return  gulp.src(constants.style.src)
                .pipe(concat(constants.style.output))
                .pipe(gulpIf(argv.release, cleanCSS(constants.minify.css)))
                .pipe(gulp.dest(constants.basePath + constants.style.dest))
    })
    gulp.task('js', function(){
        return  gulp.src(constants.js.src)
                .pipe(gulpIf(argv.release, uglify(constants.minify.js)))
                .pipe(gulp.dest(constants.basePath + constants.js.dest))
    })
    gulp.task('font', function() {
        return gulp.src(constants.font.src)
            .pipe(gulp.dest(constants.basePath + constants.font.dest));
    });
    gulp.task('img', function() {
        return gulp.src(constants.image.src)
            .pipe(gulpIf(argv.release, imagemin()))
            .pipe(gulp.dest(constants.basePath + constants.image.dest));
    });
    gulp.task('html', function() {
        return gulp.src(constants.html.src)
            .pipe(htmlmin(constants.minify.html))
            .pipe(gulp.dest(constants.basePath + constants.html.dest));
    });
    gulp.task('index', function() {
        return gulp.src(constants.html.index)
            .pipe(htmlmin(constants.minify.html))
            .pipe(gulp.dest(constants.basePath));
    });

//监控服务
gulp.task('filesWatch', ['dist'], function(){
    watch(constants.style.src, function() {
        gulp.start('styleWatch');
    });
    watch(constants.html.src, function() {
        gulp.start('htmlWatch');
    });
    watch(constants.image.src, function() {
        gulp.start('imgWatch');
    });
    watch(constants.js.src, function() {
        gulp.start('jsWatch');
    });
    watch(constants.html.index, function() {
        gulp.start('indexWatch');
    });
    watch(constants.font.src, function() {
        gulp.start('fontWatch');
    });
});
