module.exports = {
    devServer: {
        historyApiFallback: true, // react router
        port: 8080,
        proxy: {
            '/api/': {
                target: 'http://localhost:3095',
                changeOrigin: true,
            },
        },
    },
};