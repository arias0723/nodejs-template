// export type Status = 'new' | 'booked' | 'canceled'
export enum Status {
  NEW = 'new',
  BOOKED = 'booked',
  CANCELLED = 'cancelled'
}

export interface Booking {
  id: number
  desc: string
  status: Status
}
