// @author laudeon
// MIT licensed

'use strict'

require('dotenv').config()

const fs = require('fs')
const path = require('path')
const debug = require('debug')('drive-list-folder')
const app = require('./lib')
const {getTree} = require('./lib/tree')

const tree = (params) => {
  return app.vroum(params)
    .then(res => getTree(res.files))
    .catch(debug)
}

const treeToFile = (params, path) => {
  return app.vroum(params)
    .then(res => {
      const tree = getTree(res.files)
      const data = JSON.stringify(tree)
      fs.writeFile(path, data, 'UTF-8', err => {
        if (err) throw err
        debug('tree saved in json file!')
      })
    })
    .catch(debug)
}

module.exports = {
  tree: tree,
  treeToFile: treeToFile
}
