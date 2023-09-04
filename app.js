import express, { json } from 'express' // require -> commonJS
import { randomUUID } from 'node:crypto'
import cors from 'cors'

import { validateMovie, validatePartialMovie } from './schemas/movies.js'

import { corsMiddleware } from './middlewares/cors.js'

import {readJSON} from './utils.js'
import { routerMovies } from './routes/movies.js'

const movies = readJSON('./movies.json')

const app = express()
app.use(json()) 
app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

// Todos los recursos que sean MOVIES se identifica con /movies
app.use('/movies', routerMovies)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
