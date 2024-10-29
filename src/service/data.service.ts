import { Booking } from '../types'
import data from './data.json'

const bookings: Booking[] = data as Booking[]
export const getBookings = (): Booking[] => bookings
