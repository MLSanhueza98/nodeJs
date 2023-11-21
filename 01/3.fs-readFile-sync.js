// sync
const fs = require('node:fs')

console.log('Leyendo primer archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log('texto 1: ', text)

console.log('=> realiza algo epico')

console.log('Leyendo segundo archivo...')
const secondtext = fs.readFileSync('./archivo2.txt', 'utf-8')
console.log('texto 2: ', secondtext)
