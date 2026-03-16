import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ConcertsPage from '../pages/ConcertsPage.vue'
import ArtsPage from '../pages/ArtsPage.vue'
import SportsPage from '../pages/SportsPage.vue'
import ExperiencesPage from '../pages/ExperiencesPage.vue'
import WorkshopsPage from '../pages/WorkshopsPage.vue'
import EventDetailPage from '../pages/EventDetailPage.vue'
import MyTicketsPage from '../pages/MyTicketsPage.vue'
import ProfilePage from '../pages/ProfilePage.vue'
import OrganizerPage from '../pages/OrganizerPage.vue'
import CreateEventPage from '../pages/CreateEventPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/concerts', name: 'concerts', component: ConcertsPage },
  { path: '/arts', name: 'arts', component: ArtsPage },
  { path: '/sports', name: 'sports', component: SportsPage },
  { path: '/experiences', name: 'experiences', component: ExperiencesPage },
  { path: '/workshops', name: 'workshops', component: WorkshopsPage },
  { path: '/event/:id', name: 'event-detail', component: EventDetailPage },
  { path: '/my-tickets', name: 'my-tickets', component: MyTicketsPage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/organizer', name: 'organizer', component: OrganizerPage },
  { path: '/create-event', name: 'create-event', component: CreateEventPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
