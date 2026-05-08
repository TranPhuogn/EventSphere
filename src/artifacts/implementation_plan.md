# Build Full Admin Dashboard

This plan outlines the steps to upgrade the EventSphere Admin Dashboard from a UI placeholder to a fully functional frontend system.

## User Review Required
Please review the proposed plan below. Let me know if you want to add any other pages or specific mock data requirements for Users and Orders.

## Proposed Changes

### 1. Router & Layout Updates
Update `src/router/index.js` to handle new admin routes and redirect `/admin` to `/admin/dashboard` instead of `/admin/events`.
Update `src/layouts/AdminLayout.vue` to include responsive CSS (media queries) for the sidebar and topbar, and integrate a global `Toast` and `ConfirmModal` component.
Update `src/components/admin/Sidebar.vue` to add a hamburger menu toggle for mobile and styling for responsive collapsing.
Update `src/components/admin/Topbar.vue` to make the search reactive and handle routing to search results or filtering the current view based on the current active admin route.

#### [MODIFY] `src/router/index.js`
#### [MODIFY] `src/layouts/AdminLayout.vue`
#### [MODIFY] `src/components/admin/Sidebar.vue`
#### [MODIFY] `src/components/admin/Topbar.vue`

---

### 2. Dashboard Page
Create the main Dashboard page displaying high-level metrics. It will use mock data for users, orders, and revenue, but real data from `eventStore` for events.

#### [NEW] `src/pages/admin/AdminDashboard.vue`
- Total Events, Users, Orders, Revenue cards.
- Recent Events table (sliced from store).
- Recent Orders table (mock data).

---

### 3. Users Management Page
Create a Users page to display and "manage" users.

#### [NEW] `src/pages/admin/UsersAdmin.vue`
- Table of mock users with columns: name, email, role, status.
- Action buttons to disable/delete (frontend mock logic).

---

### 4. Orders Management Page
Create an Orders page.

#### [NEW] `src/pages/admin/OrdersAdmin.vue`
- Table of mock orders mapping to events.
- Columns: orderId, user, event, totalPrice, status, date.
- Badges for status (pending, confirmed, cancelled).
- Status filtering dropdown.

---

### 5. Events Admin Upgrades
Upgrade the existing `EventsAdmin.vue` page.

#### [MODIFY] `src/pages/admin/EventsAdmin.vue`
- Integrate `sold-out` computed logic (`priceRange.min == 0`).
- Add empty state UI.
- Add mock loading state.
- Improve status badge UI.
- Integrate the new `ConfirmModal` for deletes.

---

### 6. UI Polish Components
Add reusable components for professional UI polish.

#### [NEW] `src/components/admin/ToastNotification.vue`
- Listens to `eventStore.toast` or a dedicated store and displays floating notifications.
#### [NEW] `src/components/admin/ConfirmModal.vue`
- Reusable confirmation dialog for delete actions.

## Verification Plan
1. Navigate to `/admin` and verify redirection to `/admin/dashboard`.
2. Check that all Sidebar links work and display correct pages.
3. Test responsiveness by resizing the window (Sidebar should hide/collapse, Topbar search should shrink/stack).
4. Delete an event to test the `ConfirmModal` and `ToastNotification`.
5. Test the Topbar search input to ensure it filters events/users.
