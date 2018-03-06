// @author laudeon
// MIT licensed

'use strict'

const url = require('url')
const http = require('http')
const querystring = require('querystring')
const opn = require('opn')
const destroyer = require('server-destroy')
const {OAuth2Client} = require('google-auth-library')
const scope = 'https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/drive'

// Google API oAuth2 client Class
class Client {
  constructor () {
    this.oAuth2Client = new OAuth2Client(
      process.env.YOUR_CLIENT_ID,
      process.env.YOUR_CLIENT_SECRET,
      process.env.YOUR_REDIRECT_URL
    )
  }

  // Open the authorization window in the browser.
  // Then, on the callback route, resolve the tokens.
  //
  // @return {Promise}
  authenticate () {
    this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scope
    })

    return new Promise((resolve, reject) => {
      const server = http.createServer((req, res) => {
        if (req.url.indexOf('/oauthcallback') > -1) {
          const qs = querystring.parse(url.parse(req.url).query)

          res.end('Authentication successful! Please return to the console.')
          server.destroy()

          this.oAuth2Client.getToken(qs.code, (err, tokens) => {
            if (err) {
              return reject(err)
            }
            return resolve(tokens)
          })
        }
      })

      server.listen(3000, () => {
        opn(this.authorizeUrl, { wait: false }).then(cp => cp.unref())
      })

      destroyer(server)
    })
  }
}

module.exports = new Client()
