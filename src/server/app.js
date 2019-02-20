import path from 'path'

import app, {express} from './labo'
import article from './router/article'
import bodyParser from 'body-parser'
// 设置端口号
app.set('port', process.env.PORT || 4000)

// 设置根路径
app.set('rootPath', __dirname)
// 解析 application/json
app.use(bodyParser.json())
// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// html文件
app.get('/', (req, res) => {
  res.sendFile('client/index.html', { root: path.join(__dirname, '../') })
})
// 配置静态资源文件虚拟路径
app.use('/static', express.static(path.join(__dirname, '../client/static')))
app.use('/article', article)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res) {
  res.status(err.status || 500)
  res.send(err.message)
})

const port = app.get('port')
app.listen(port, () => {
  console.info(`server start port: ${port}`)
})
