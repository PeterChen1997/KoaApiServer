const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./router/rootRouter')
const cors = require('@koa/cors')

const app = new Koa()

app.use(bodyParser())
app.use(cors())

router(app)

app.listen(3002, () => {
  console.log('server is running~~~')
})