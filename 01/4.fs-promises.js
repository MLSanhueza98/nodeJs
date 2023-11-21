// a partir de Node 16, se recomienda poner node:fs
const fs = require('node:fs/promises')

console.log('Leyendo primer archivo...')
fs.readFile('./archivo.txt', 'utf-8')
  .then(text => {
    console.log('texto 1: ', text)
  })

console.log('=> realiza algo epico')

console.log('Leyendo segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8')
  .then(text => {
    console.log('texto 2: ', text)
  })
