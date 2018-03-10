const Articles = require('../model/articles')

// 添加新用户
const article = Articles.sync({
  force: false
})

const addArticle = (data) => {
  // 向 articles 表中插入数据
  return Articles.create({
    id: data.id,
    title: data.title,
    desc: data.desc,
    topic: data.topic,
    date: data.date,
    content: data.content
  })
}

// 查找文章
const findArticle = function (id) {
  return Articles.findOne({
    where: {
      id
    }
  })
}

// 修改文章
const editArticle = function (data) {
  return Articles.update(data, {
    where: {
      id: data.id
    }
  })
}

// 寻找所有文章
const getAll = function () {
  return Articles.findAll()
}

// 删除制定文章
const deleteArticle = function (id) {
  return Articles.destroy({
    where: {
      id
    }
  })
}

// 增加文章浏览量

const addArticleViewCount = async (id) => {
  let article = await Articles.findOne({
    where: {
      id
    }
  })
  return Articles.update({ view: article.view + 1}, {
    where: {
      id
    }
  })
}

module.exports = {
  getAll,
  addArticle,
  deleteArticle,
  findArticle,
  editArticle,
  addArticleViewCount
}