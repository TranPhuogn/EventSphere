import { reactive } from 'vue'
import { ALL_EVENTS } from '../data'

export const store = reactive({
  selectedEvent: null,
  tickets: [],
  showBooking: false,
  bookingEvent: null,
  toast: null,
})

export function selectEvent(event) {
  store.selectedEvent = event
}

export function getEventById(id) {
  return ALL_EVENTS.find(e => e.id === id) || null
}

export function openBooking(event) {
  store.bookingEvent = event
  store.showBooking = true
}

export function closeBooking() {
  store.showBooking = false
}

export function addTicket(ticket) {
  store.tickets.push(ticket)
  store.showBooking = false
  store.toast = { message: 'Booking confirmed! Check My Tickets.', icon: '🎟️' }
}

export function clearToast() {
  store.toast = null
}
