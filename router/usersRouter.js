const Router = require('koa-router')

const usersRouter = new Router({
  prefix: '/users'
})

usersRouter.get('/', async (ctx, next) => {
  ctx.response.body = 'usersList'
})

usersRouter.post('/', async (ctx, next) => {
  let data = {
    ...ctx.request.body
  }
  if(data.id === 'peterchen' && data.password === 'admin') {
    ctx.response.body = {
      status: true,
      token: 'peterchen'
    }
  } else {
    ctx.response.body = {
      status: false,
      token: ''
    }
  }
  
})

module.exports = usersRouter