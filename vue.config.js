const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    port: 3080,
  },
  transpileDependencies: [
    'vuetify'
  ]
})
