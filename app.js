import express from 'express'
import 'dotenv/config'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello there!')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
