const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router/rootRouter')
const db = require('./dbConnection/mysql')
const app = new Koa()

app.use(bodyParser())

router(app)

app.listen(3000, () => {
  console.log('good')
})