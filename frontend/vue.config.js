module.exports = {
  transpileDependencies: ['some-dependency'],

  
  configureWebpack: {
    resolve: {
      alias: {
        '@vue/runtime-core': require.resolve('@vue/runtime-core')
      },
    },
  },


};
