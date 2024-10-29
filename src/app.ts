import express from 'express'
import 'dotenv/config'
import { bookingRouter } from './route/booking.route'

// Middelwares
const app = express()
app.use(express.json())

// Routes
app.get('/', (_req, res) => {
  console.log('hi')
  res.send('Hello there!')
})

app.use('/api/bookings', bookingRouter)

// Server
const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
