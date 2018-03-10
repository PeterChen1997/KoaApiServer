// koa-router返回的为函数，需要执行
const Router = require('koa-router')

const articlesRouter = require('./articlesRouter')
const usersRouter = require('./usersRouter')

module.exports = (app) => {

  const rootRouter = new Router({
    prefix: '/v1'
  })

  rootRouter.use(articlesRouter.routes(),usersRouter.routes())
  
  app.use(rootRouter.routes())
}