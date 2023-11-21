// nos dara un puerto disponible
const net = require('node:net')

function findAvalaiblePort (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      const { port } = server.address()
      server.close(() => {
        resolve(port)
      })
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINNUSE') {
        findAvalaiblePort(0).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = { findAvalaiblePort }
