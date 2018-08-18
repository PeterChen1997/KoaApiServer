const config = {
  // 启动端口
  PORT: 3000,
  DATABASE: 'blog',
  DATABASE: 'peterchen',
  USER: 'peterchen',
  PASSWORD: 'admin',
  HOST: 'localhost'
}

if (process.env.NODE_ENV === 'dev') {
  config.HOST = '119.28.82.24'
}

module.exports = config