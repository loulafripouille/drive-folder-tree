// @author laudeon
// MIT licensed

'use strict'

const {google} = require('googleapis')
const client = require('./client')

// A call to the Google drive files list endpoint.
//
// @param {Object} params, @see Google Drive REST API files.list endpoint doc.
//
// @retuns {Promise}
const list = function (params) {
  const drive = google.drive({
    version: 'v3',
    auth: client.oAuth2Client
  })
  return new Promise((resolve, reject) => {
    drive.files.list(params, (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res.data)
    })
  })
}

// Entry point of the app
//
// @param {Object} params, @see Google Drive REST API files.list endpoint doc.
//
// @returns {Promise}
const vroum = function (params) {
  return client.authenticate()
    .then(tokens => {
      client.oAuth2Client.setCredentials(tokens)
      return list(params)
    })
}

exports.vroum = vroum
