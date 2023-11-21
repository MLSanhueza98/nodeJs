const fs = require('node:fs/promises')
const path = require('node:path')

const pc = require('picocolors')
const folder = process.argv[2] ?? '.'

async function ls (directory) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch {
    console.error(pc.red(`error al leer el directorio ${folder} `))
    process.exit(0)
  }

  const filePromises = files.map(async file => {
    const filePath = path.join(folder, file)
    let stats
    try {
      stats = await fs.stat(filePath) // status - informacion del archivo
    } catch {
      console.error(`error al leer el archivo ${filePath} `)
      process.exit(1)
    }
    const isDirectory = stats.isDirectory()
    const fileType = isDirectory ? 'd' : '-'
    const fileSize = stats.size.toString()
    // const fileModified = stats.mtime.toLocalString()
    return `${fileType} ${pc.green(file.padEnd(20))}  ${pc.yellow(fileSize.padStart(10))}`
  })

  const filesInfo = await Promise.all(filePromises)

  filesInfo.forEach(filesInfo => console.log(filesInfo))
}

ls(folder)
