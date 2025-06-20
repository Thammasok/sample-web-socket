import express from 'express'
import { createServer } from 'node:http'
import cors from 'cors'

import 'dotenv/config'

const app = express()
const server = createServer(app)

const PORT = process.env.PORT ?? 3210

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('<h1>Hello world!!!</h1>')
})

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
