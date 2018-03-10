const Router = require('koa-router')
const articlesController = require('../controller/articles')

const articlesRouter = new Router({
  prefix: '/articles'
})

// 新增article
articlesRouter.post('/',async(ctx, next)=>{
  console.log('新增文章')
})

// 删除article
articlesRouter.delete('/',async(ctx, next)=>{
  console.log('删除文章ID为' + id)
  let { id } = ctx.request.body
})

// 修改article
articlesRouter.patch('/',async(ctx, next)=>{
  console.log('修改文章ID为' + id)
  let { id } = ctx.request.body
})

// 获取所有articles
articlesRouter.get('/', async (ctx, next) => {
  console.log('获取所有文章')
  articlesController.getAll()
})

// 根据id获取article
articlesRouter.get('/:id', async (ctx, next) => {
  ctx.response.body = 'article Detail'
})

module.exports = articlesRouter
