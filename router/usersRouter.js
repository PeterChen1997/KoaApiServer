const Router = require('koa-router')

const usersRouter = new Router({
  prefix: '/users'
})

usersRouter.get('/', async (ctx, next) => {
  ctx.response.body = 'usersList'
})

module.exports = usersRouter