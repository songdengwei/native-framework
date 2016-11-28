var gulp      = require('gulp');
var watch = require('gulp-watch'); //watch files
var minifyhtml= require('gulp-htmlmin');//压缩html；
var minifycss = require('gulp-minify-css');//压缩css；
var minifyImg = require('gulp-imagemin');//压缩图片；

var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var _ = require('lodash');
var constants = require('./environment/gulpConstants')();

// Static server
gulp.task('serve', ['filesWatch'], function() {
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

//监控服务
gulp.task('filesWatch', function(){
    watch(constants.style.src, function() {
        gulp.start('styleWatch');
    });
    watch(constants.html.src, function() {
        gulp.start('htmlWatch');
    });
    watch(constants.img.src, function() {
        gulp.start('imgWatch');
    });
    watch(constants.js.src, function() {
        gulp.start('jsWatch');
    });
});

//定义监控事件
gulp.task('styleWatch', function() {
    browserSync.reload();
});
gulp.task('htmlWatch', function() {
    browserSync.reload();
});
gulp.task('imgWatch', function() {
    browserSync.reload();
});
gulp.task('jsWatch', function() {
    browserSync.reload();
});
