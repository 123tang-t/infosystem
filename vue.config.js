// const devUrl = 'http:/119.23.250.47/info'
// const proUrl = ''
// const target = devUrl

// const proxy = {}
// const proxyUrls = [
//     'menu',
//     'vacation'
// ]

// proxyUrls.forEach(url => {
//     proxy[url] = {
//         target: target,
//         changeOrigin: true
//     }
// })

// module.exports = {
//     publicPath: process.env.NODE_ENV === 'production' ? '/static' : '/',
//     devServer: {
//         proxy: proxy
//     }
// }

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://119.23.250.47/info',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}