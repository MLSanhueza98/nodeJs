import express, { json } from 'express'

import { movieRouter } from './routes/movie.js'
import { corsMiddlware } from './middleware/cors.js'

const app = express()
app.use(json())
app.use(corsMiddlware())
app.disable('x-powered-by') // deshabilitr el header X-Powered-By: Express

app.use('/movies', movieRouter)

const PORT = process.env.port ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
