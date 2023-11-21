// async secuencial
const { readFile } = require('node:fs/promises');

// IIFE - Inmediatly Invoked Function Expression
(
  async () => {
    console.log('Leyendo primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('texto 1: ', text)

    console.log('=> realiza algo epico')

    console.log('Leyendo segundo archivo...')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('texto 2: ', secondText)
  }
)()

// es lo mismo que esto:
// async function main () {}
// main()
