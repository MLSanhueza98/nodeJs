const http = require('node:http') // protocolo http
const fs = require('node:fs')

const desiredport = process.env.port ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('Página de Inicio')
  } else if (req.url === '/image') {
    fs.readFile('./02/pikachu.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('500 Internal Server Error')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.end('Contacto')
  } else {
    res.statusCode = 404
    res.end('404 Not Found')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredport, () => {
  console.log(`server listening on port http://localhost:${desiredport}`)
})
