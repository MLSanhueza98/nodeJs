import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddlware } from './middleware/cors.js'

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddlware())
  app.disable('x-powered-by') // deshabilitr el header X-Powered-By: Express

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.port ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}
