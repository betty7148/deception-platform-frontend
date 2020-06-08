module.exports = {
    lintOnSave: true,
   
    devServer: {
        proxy: {
            '/api': {
              target: 'http://localhost:8091',
              changeOrigin: true,
              secure: false,
              pathRewrite: {'^/api' : ''},
            }
          }
    }
  }
  