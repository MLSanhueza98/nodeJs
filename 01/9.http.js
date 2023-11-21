const http = require('node:http') // protocolo http
const { findAvalaiblePort } = require('./10.free-port')

const desiredport = process.env.port ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola Mundo')
})

findAvalaiblePort(desiredport).then(port => {
  server.listen(port, () => {
    console.log(`server listening on port http://localhost:${port}`)
  })
})
