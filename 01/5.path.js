const path = require('node:path')

// barra separadora de carpetas segun OS
console.log(path.sep)

// unir rutas con path.join

const filePath = path.join('content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename('/carpeta/carpeta/password.txt')
console.log(base)

const filename = path.basename('/carpeta/carpeta/password.txt', '.txt')
console.log(filename)

const ext = path.extname('image.jpg')
console.log(ext)
