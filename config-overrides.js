const path = require('path')

const {
  override, //加载器
  addWebpackAlias, //别名配置
  addLessLoader, //less加载器
  addDecoratorsLegacy, //装饰器
  addPostcssPlugins, // less依赖
  fixBabelImports, //babel
  overrideDevServer, //开发服务器
} = require('customize-cra')

/**
 * 代理配置
 */
const addProxy = () => config => {
  return {
    ...config,
    proxy: {
      '/api': {
        // 环境设定后期会讲, 这里可以参考.env中的配置
        target: 'http://vueshop.glbuys.com',
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': '',
        // },
      },
    },
  }
}

module.exports = {
  webpack: override(
    // 使用修饰器
    addDecoratorsLegacy(),
    // 加载less文件
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,
      },
      sourceMap: true,
    }),
    // rem, 仅移动端开发时需要
    addPostcssPlugins([
      require('postcss-px2rem-exclude')({
        // 这里我们设定标准大小为37.5,这样在css中使用时只需按照设计图的标准尺寸写px就能正常转换
        // 比如750px就是标准页面宽度
        remUnit: 37.5,
        propList: ['*', '!border'],
        exclude: /node_modules/i,
      }),
    ]),
    // antd按需加载工具, 具体用法参考以下链接
    // https://github.com/ant-design/babel-plugin-import
    fixBabelImports('import', {
      libraryName: 'antd',
      style: 'css',
    }),
    // 路径别名
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@assets': path.resolve(__dirname, 'src/assets'),
    })
  ),
  // 开发环境服务器代理, 一般情况下不需要我们自己配
  devServer: overrideDevServer(addProxy()),
}
