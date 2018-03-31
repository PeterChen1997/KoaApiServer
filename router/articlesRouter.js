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
articlesRouter.delete('/:id',async(ctx, next)=>{
  let { id } = ctx.params
  console.log('删除文章ID为' + id)
  
  let result = await articlesController.deleteArticle(id)
  ctx.response.body = result === 0 ? 'error' : 'success'
})

// 修改article
articlesRouter.patch('/:id',async(ctx, next)=>{
  let { id } = ctx.params
  let data = {
    ...ctx.request.body
  }
  let result = [...await articlesController.editArticle(data, id)]
  ctx.response.body = result === 0 ? 'error' : 'success'
})

// 获取所有articles
articlesRouter.get('/', async (ctx, next) => {
  ctx.response.body = await articlesController.getAll()
})
articlesRouter.get('/:index', async (ctx, next) => {
  console.log('获取所有文章')
  let { index } = ctx.params
  ctx.response.body = await articlesController.getArticles(index, 5)
})

// 根据id获取article，访问量+1
articlesRouter.get('/detail/:id', async (ctx, next) => {
  let { id } = ctx.params
  console.log('要查找的文章ID为' + id)
  articlesController.addArticleViewCount(id)
  ctx.response.body = await articlesController.findArticle(id)
})

// 根据内容搜索文章
articlesRouter.get('/search/:info/:index', async (ctx, next) => {
  let { info, index } = ctx.params
  console.log('要查找的文章内容为' + info)
  
  if(index !== '0') {
    ctx.response.body = await articlesController.fuzzyQuery(info, index, 5)
  } else {
    ctx.response.body = {
      data: {}
    }
  }
})

module.exports = articlesRouter
