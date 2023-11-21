// a partir de Node 16, se recomienda poner node:fs
const fs = require('node:fs')

const stats = fs.statSync('./archivo.txt')

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
)
