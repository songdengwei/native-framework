module.exports = function() {
    var gulpConstants = {
        basePath: 'dist/',
        browser: {
            server: {
                baseDir: "./dist"
                // middleware: [historyApiFallback()]
            },
            host: 'localhost',
            port: 3000,
            https: undefined,
            logPrefix: 'BS'
        },
        style: {
            src: 'www/css/*.css',
            output: 'main.css',
            dest: 'css'
        },
        image: {
            src: 'www/img/*.*',
            dest: 'img'
        },
        html: {
            index: 'www/index.html',
            src: 'www/src/**/*.html',
            dest: 'src'
        },
        font: {
            src: 'www/font/*.*',
            dest: 'font'
        },
        js: {
            src: ['www/src/*.js', 'www/src/**/*.js'],
            dest: 'src'
        },
        minify: {
            js: '-m toplevel',
            html: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true
            },
            css: {
                compatibility: 'ie8',
                keepSpecialComments: 0
            }
        }
    };
    return gulpConstants;
};
