
import {express} from '../labo'
import path from 'path'
import rf from 'fs'
import multer from 'multer'
import oss from 'ali-oss'
const store = oss({
  accessKeyId: 'LTAIebpqdneTkIto',
  accessKeySecret: '8TLZQONEvr0vhEVx1LG7vfwIFDH99l',
  bucket: 'jessiezmj',
  region: 'oss-cn-beijing'
})
const upload = multer({ dest: 'uploads/' })
function getList () {
  return new Promise((resolve, reject) => {
    rf.readFile(path.join(process.cwd(), '/static/article/list.json'), 'utf-8', function (err, data) {
      resolve({
        err,
        data: JSON.parse(data || '[]')
      })
    })
  })
}
function setList (data) {
  data = JSON.stringify(data)
  return new Promise((resolve, reject) => {
    rf.writeFile(path.join(process.cwd(), '/static/article/list.json'), data, function (err) {
      resolve({
        err
      })
    })
  })
}
function getArticle (id) {
  return new Promise((resolve, reject) => {
    rf.readFile(path.join(process.cwd(), `/static/article/${id}.json`), 'utf-8', function (err, data) {
      resolve({
        err,
        data: JSON.parse(data || '{}')
      })
    })
  })
}

const router = express.Router()
router.post('/setList', (req, res) => {
  const { body } = req
  const {
    list,
  } = body
  setList(list).then(({err}) => {
    if(!err) {
      res.json({
        code: 0,
        err,
        data: list
      })
    }else {
      res.send(500)
    }
  })
})
router.get('/list', (req, res) => {
  getList().then(({err, data}) => {
    res.json({
      data,
      code: 0,
      err
    })
  })
})
router.post('/add', (req, res) => {
  getList().then(({err, data}) => {
    if (err) {
      res.send(500)
    } else {
      const { body } = req
      const {
        content,
        ...other
      } = body
      const article = other
      const idx = data.findIndex(d => d.id === body.id)
      if (~idx) {
        data[idx] = article
      } else {
        data.push(article)
      }
      return setList(data)
    }
  }).then(({err}) => {
    if (err) {
      return {err}
    } else {
      const { body } = req
      return new Promise((resolve, reject) => {
        rf.writeFile(path.join(process.cwd(), `/static/article/${body.id}.json`), JSON.stringify(body), function (err) {
          resolve({
            err
          })
        })
      })
    }
  }).then(({err}) => {
    res.json({
      code: 0,
      err,
      data: !err
    })
  })
})
router.get('/get', (req, res) => {
  const {
    query
  } = req
  getArticle(query.id).then(({err, data}) => {
    res.json({
      code: 0,
      err,
      data
    })
  })
})
router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file
  try {
    let result = await store.put(file.filename + file.originalname, file.path)
    rf.unlink(file.path, () => {
      res.json({
        code: 0,
        err: null,
        data: result.url
      })
    })
  } catch (e) {
    rf.unlink(file.path, () => {
      res.json({
        code: 0,
        err: e
      })
    })
  }
})

export default router
