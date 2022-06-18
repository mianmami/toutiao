module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    /* 不允许生产环境中出现console.log这样的代码 */
    // 'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}

//   /* 不允许生产环境中出现debugger这样的代码 */
  //   'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  //   /* 定义的变量是否有被使用 */
  //   'no-unused-vars': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  // }
