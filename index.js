// @author laudeon
// MIT licensed

'use strict'

require('dotenv').config()

const debug = require('debug')('drive-list-folder')
const app = require('./lib')
const {consoleTree, getTree} = require('./lib/tree')

// const params = {
//   supportsTeamDrives: true,
//   corpora: 'teamDrive',
//   includeTeamDriveItems: true,
//   teamDriveId: process.env.TEAM_DRIVE_ID,
//   pageSize: 1000,
//   q: `mimeType = 'application/vnd.google-apps.folder'`,
//   fields: 'files(parents,name,id)'
// }

exports.getTree = (params) => {
  return app.vroum(params)
    .then(res => getTree(res.files))
    .catch(debug)
}

exports.consoleTree = (params) => {
  return app.vroum(params)
    .then(res => consoleTree(res.files))
    .catch(debug)
}
