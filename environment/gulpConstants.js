module.exports = function() {
    var gulpConstants = {
        
        browser: {
            server: {
                baseDir: "./jquery_frame/"
                // middleware: [historyApiFallback()]
            },
            host: 'localhost',
            port: 3000,
            https: undefined,
            logPrefix: 'BS'
        }
    };
    return gulpConstants;
};
