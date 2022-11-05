module.exports = {
    devServer: {
        historyApiFallback: true, // react router
        port: 4000,
        proxy: {
            '/api/': {
                target: 'http://localhost:8080',
                changeOrigin: true,
            },
        },
    },
};