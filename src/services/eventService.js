// ─── EVENT SERVICE LAYER ─────────────────────────────────────────────────────
// This module simulates API calls with Promises and artificial delay.
// When a real backend is available, replace the body of each method
// with actual fetch/axios calls. The function signatures stay the same.

import { MOCK_EVENTS } from '../mocks/eventMock'

// In-memory store that simulates a database
let events = [...MOCK_EVENTS]

// Simulated network delay (ms)
const DELAY = 350

function delay(ms = DELAY) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function generateId() {
  return 'ev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 6)
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function computeStatus(dateStart, dateEnd) {
  const now = new Date()
  const start = new Date(dateStart)
  const end = dateEnd ? new Date(dateEnd) : null
  if (end && now > end) return 'ended'
  if (now > start) return 'ended'
  return 'upcoming'
}

// ─── PUBLIC API ──────────────────────────────────────────────────────────────

/**
 * Fetch all events.
 * Future: GET /api/events
 */
export async function fetchEvents() {
  await delay()
  return [...events]
}

/**
 * Fetch a single event by ID.
 * Future: GET /api/events/:id
 */
export async function fetchEventById(id) {
  await delay()
  const event = events.find(e => e.id === id) || null
  return event
}

/**
 * Create a new event.
 * Future: POST /api/events
 */
export async function createEvent(eventData) {
  await delay()
  const newEvent = {
    ...eventData,
    id: generateId(),
    slug: generateSlug(eventData.title),
    status: computeStatus(eventData.dateStart, eventData.dateEnd),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  events.unshift(newEvent)
  return { ...newEvent }
}

/**
 * Update an existing event.
 * Future: PUT /api/events/:id
 */
export async function patchEvent(id, updateData) {
  await delay()
  const index = events.findIndex(e => e.id === id)
  if (index === -1) throw new Error(`Event not found: ${id}`)

  events[index] = {
    ...events[index],
    ...updateData,
    slug: updateData.title ? generateSlug(updateData.title) : events[index].slug,
    status: computeStatus(
      updateData.dateStart || events[index].dateStart,
      updateData.dateEnd || events[index].dateEnd
    ),
    updatedAt: new Date().toISOString()
  }
  return { ...events[index] }
}

/**
 * Delete an event by ID.
 * Future: DELETE /api/events/:id
 */
export async function removeEvent(id) {
  await delay()
  const index = events.findIndex(e => e.id === id)
  if (index === -1) throw new Error(`Event not found: ${id}`)
  events.splice(index, 1)
  return { success: true }
}
