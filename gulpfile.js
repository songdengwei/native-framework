var gulp      = require('gulp');
var minifyhtml= require('gulp-htmlmin');//压缩html；
var minifycss = require('gulp-minify-css');//压缩css；
var minifyImg = require('gulp-imagemin');//压缩图片；

var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;
var _ = require('lodash');
var constants = require('./environment/gulpConstants')();

// Static server
gulp.task('serve', function() {
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

