const Koa = require('koa')
// koa-router返回的为函数，需要执行
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser())

const articlesRouter = new Router({
  prefix: '/articles'
})
const usersRouter = new Router({
  prefix: '/users'
})

articlesRouter.get('/', async (ctx, next) => {
  ctx.response.body = 'articlesList'
})

articlesRouter.get('/:id', async (ctx, next) => {
  ctx.response.body = 'article Detail'
})

usersRouter.get('/', async (ctx, next) => {
  ctx.response.body = 'usersList'
})


app.use(articlesRouter.routes())
app.use(usersRouter.routes())

app.listen(3000, () => {
  console.log('good')
})