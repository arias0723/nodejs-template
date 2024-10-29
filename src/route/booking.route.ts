import { Router } from 'express'
import { getBookings } from '../service/data.service'

const router = Router()

router.get('/', (_req, res) => {
  res.send(getBookings())
})

router.post('/', (_req, res) => {
  res.send('hi')
})

router.post('/:id', (req, res) => {
  res.send('hi')
})

router.put('/:id', (req, res) => {
  return res.sendFile('index.html', { root: './public' })
})

export {
  router as bookingRouter
}
