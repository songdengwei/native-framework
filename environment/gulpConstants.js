module.exports = function() {
    var gulpConstants = {
        
        browser: {
            server: {
                baseDir: "./www"
                // middleware: [historyApiFallback()]
            },
            host: 'localhost',
            port: 3000,
            https: undefined,
            logPrefix: 'BS'
        },
        style: {
            src: 'www/css/*.css'
        },
        img: {
            src: 'www/img/*.*'
        },
        html: {
            src: 'www/src/template/*.html'
        },
        js: {
            src: ['www/src/*.js', 'www/src/controller/*.js']
        }
    };
    return gulpConstants;
};
