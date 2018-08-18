const Router = require('koa-router')
const articlesController = require('../controller/articles')
const redisServer = require('../dbConnection/redis')
const { promisify } = require('util')

const articlesRouter = new Router({
  prefix: '/articles'
})

const getAsync = promisify(redisServer.get).bind(redisServer)

// 新增article
articlesRouter.post('/', async (ctx, next) => {
  let { title, topic, desc, content } = ctx.request.body
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

  // flush redis
  redisServer.flushdb((err, succeeded) => {
    console.log(succeeded) // will be true if successfull
  })
})

// 删除article
articlesRouter.delete('/:id', async (ctx, next) => {
  let { id } = ctx.params
  console.log('删除文章ID为' + id)

  let result = await articlesController.deleteArticle(id)
  ctx.response.body = result === 0 ? 'error' : 'success'

  // flush redis
  redisServer.flushdb((err, succeeded) => {
    console.log(succeeded) // will be true if successfull
  })
})

// 修改article
articlesRouter.patch('/:id', async (ctx, next) => {
  let { id } = ctx.params
  let data = {
    ...ctx.request.body
  }
  let result = [...await articlesController.editArticle(data, id)]
  ctx.response.body = result === 0 ? 'error' : 'success'

  // flush redis
  redisServer.flushdb((err, succeeded) => {
    console.log(succeeded) // will be true if successfull
  })
})

// 获取所有articles
articlesRouter.get('/', async (ctx, next) => {
  console.log('获取所有文章')
  ctx.response.body = await articlesController.getAll()
})

// 按页获取articles
articlesRouter.get('/page/:index', async (ctx, next) => {
  let { index } = ctx.params
  console.log('按页获取articles')

  // get from redis
  const redisRes = await getAsync(`/page/${index}`)
  if (redisRes && redisRes !== {}) {
    ctx.response.body = JSON.parse(redisRes)
    return
  }

  // get from db
  const queryResult = await articlesController.getArticles(index, 5)
  ctx.response.body = queryResult

  // refresh the redis store
  redisServer.set(`/page/${index}`, JSON.stringify(queryResult))
  console.log('add to redis')

})

// 获取所有的Tags
articlesRouter.get('/tags', async (ctx, next) => {
  console.log('获取所有文章Tags')

  // get from redis
  const redisRes = await getAsync(`/tags`)
    if (redisRes && redisRes !== {}) {
    ctx.response.body = JSON.parse(redisRes)
    return
  }

  const articles = await articlesController.getAll()
  let resultArr = articles.reduce((arr, article) => {
    article.topic.split("-").map(tag => {
      if (arr.indexOf(tag) === -1) {
        arr.push(tag)
      }
    })
    return arr
  }, [])
  ctx.response.body = resultArr

  // refresh the redis store
  redisServer.set(`/tags`, JSON.stringify(resultArr))
  console.log('add to redis')
})

// 根据id获取article，访问量+1
articlesRouter.get('/:id', async (ctx, next) => {
  let { id } = ctx.params
  console.log('要查找的文章ID为' + id)

  // get from redis
  const redisRes = await getAsync(`/${id}`)
    if (redisRes && redisRes !== {}) {
    ctx.response.body = JSON.parse(redisRes)
    return
  }

  articlesController.addArticleViewCount(id)
  const queryResult = await articlesController.findArticle(id)

  ctx.response.body = queryResult

  // refresh the redis store
  redisServer.set(`/${id}`, JSON.stringify(queryResult))
  console.log('add to redis')
})

// 根据浏览量获取article
articlesRouter.get('/:type/:index', async (ctx, next) => {
  let { type, index } = ctx.params

  // get from redis
  const redisRes = await getAsync(`/${type}/${index}`)
    if (redisRes && redisRes !== {}) {
    ctx.response.body = JSON.parse(redisRes)
    return
  }

  const queryResult = await articlesController.getArticlesByType(type, index)
  ctx.response.body = queryResult

  // refresh the redis store
  redisServer.set(`/${type}/${index}`, JSON.stringify(queryResult))
  console.log('add to redis')
})

// 根据内容搜索文章
articlesRouter.get('/search/:info/:index', async (ctx, next) => {
  let { info, index } = ctx.params
  console.log('要查找的文章内容为' + info)

  // get from redis
  const redisRes = await getAsync(`/search/${info}/${index}`)
    if (redisRes && redisRes !== {}) {
    ctx.response.body = JSON.parse(redisRes)
    return
  }

  let queryResult
  if (index !== '0') {
    queryResult = await articlesController.fuzzyQuery(info, index, 5)
  } else {
    queryResult = {
      data: {}
    }
  }
  ctx.response.body = queryResult

  // refresh the redis store
  redisServer.set(`/search/${info}/${index}`, JSON.stringify(queryResult))
  console.log('add to redis')
})

module.exports = articlesRouter
