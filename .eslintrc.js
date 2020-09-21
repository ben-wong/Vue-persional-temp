module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  plugins: [
    'vue'

  ],
  rules: {
    'semi': ['error', 'always'], // 分号结尾
    'no-var': 'error',
    'no-self-assign': 'off',
    'comma-dangle': 'off', // 允许对象最后一个参数带逗号
    'space-before-function-paren': ['error', 'never'], // 不允许函数括号之间存在空格
    'no-console': 'off', // 系统有console语句，打包编译不会报错
    'no-debugger': 'off'
    // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: { // 全局变量，true: 可以被覆盖， false：不可被覆盖
    HWH5: true,
    Message: true,
    VUE_APP_BASE_URL: true
  }
};
