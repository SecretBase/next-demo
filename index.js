const express = require('express')
const next = require('next')
const contentful = require('./lib/contentful')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()

  server.get('/api/contentful/entry/:id', (req, res, next) => {
    contentful
      .getEntry(req.params.id)
      .then(response => {
        res.json(response)
      })
      .catch(next)
  })

  server.get('/author/:id', (req, res) => {
    app.render(req, res, '/author', req.params)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
