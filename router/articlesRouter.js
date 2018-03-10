const Router = require('koa-router')
const articlesController = require('../controller/articles')

const articlesRouter = new Router({
  prefix: '/articles'
})

// 新增article
articlesRouter.post('/',async(ctx, next)=>{
  let { title, topic, desc, content } = ctx.request.body;
  let now = Date.now()
  let data = {
    id: 'article' + now,
    title,
    topic,
    desc,
    date: now,
    content
  }
  let result = await articlesController.addArticle(data)
  ctx.response.body = result
})

// 删除article
articlesRouter.delete('/',async(ctx, next)=>{
  let { id } = ctx.request.body
  console.log('删除文章ID为' + id)
  
  let result = await articlesController.deleteArticle(id)
  ctx.response.body = result === 0 ? 'error' : 'success'
})

// 修改article
articlesRouter.patch('/',async(ctx, next)=>{
  let data = {
    ...ctx.request.body
  }
  let result = [...await articlesController.editArticle(data)]
  ctx.response.body = result === 0 ? 'error' : 'success'
})

// 获取所有articles
articlesRouter.get('/', async (ctx, next) => {
  console.log('获取所有文章')
  ctx.response.body = await articlesController.getAll()
})

// 根据id获取article
articlesRouter.get('/:id', async (ctx, next) => {
  let { id } = ctx.params
  console.log('要查找的文章ID为' + id)
  ctx.response.body = await articlesController.findArticle(id)
})

module.exports = articlesRouter
