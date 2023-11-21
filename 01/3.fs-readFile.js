// async w/ callbacks
const fs = require('node:fs')

console.log('Leyendo primer archivo...')
fs.readFile('./archivo.txt', 'utf-8', (_err, text) => {
  console.log('texto 1: ', text)
})

console.log('=> realiza algo epico')

console.log('Leyendo segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (_err, text) => {
  console.log('texto 2: ', text)
})
