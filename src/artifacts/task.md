# Service-Based Architecture Refactor

- [x] 1. Create Mock Data Layer
  - [x] `src/mocks/eventMock.js` — Pre-mapped unified schema data
- [x] 2. Create Service Layer
  - [x] `src/services/eventService.js` — Async CRUD with simulated delay
- [x] 3. Refactor Event Store
  - [x] `src/stores/eventStore.js` — Uses service layer, exposes `isLoading`
  - [x] `src/main.js` — Calls `initStore()` before mount
- [x] 4. Remove all direct `data.js` imports from components
  - [x] `App.vue` — Uses `getEvents()` for search
  - [x] `ConcertsPage.vue` — Uses `getEvents()` 
  - [x] `HomePage.vue` — Already migrated
  - [x] `CategoryPage.vue` — Already migrated
  - [x] `EventDetailPage.vue` — Already migrated
- [x] 5. Make admin CRUD async
  - [x] `EventsAdmin.vue` — `handleSave` and `handleDelete` are async
