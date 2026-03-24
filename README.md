
The **Scheduler App** is a browser-based productivity tool that combines a calendar with daily task management. Users can select dates, create tasks, track completion, and monitor productivity over time.

All data is stored locally using **localStorage**, ensuring persistence without requiring a backend.

---

##  Project Purpose (School / Portfolio)
This project was developed to demonstrate:
- JavaScript fundamentals
- DOM manipulation
- State management
- User interaction handling
- Persistent data storage in the browser

---

##  How to Run

1. Download the project files:
   - `index.html`
   - `style.css`
   - `script.js`

2. Open:
   - Double-click `index.html`
   OR open it in any modern browser

3. Start using the app:
   - Select a date
   - Add and manage tasks

---

##  Features

###  Calendar
- Monthly view
- Navigate between months
- Highlights current and selected day

###  Task Management
- Add tasks per date
- Mark tasks as completed
- Delete tasks

###  Search & Filter
- Keyword search
- Filter by:
  - All
  - Completed
  - Pending

###  Dark Mode
- Toggle light/dark theme
- Saved automatically

###  Weekly Stats
- Shows completed vs total tasks (last 7 days)

###  Persistence
- Uses localStorage
- Data saved across sessions

---

##  Technical Overview

- Tasks stored as:
```
{
  "2026-3-24": [
    { "name": "Study JS", "completed": false }
  ]
}
```

- Core functions:
  - `renderCalendar()` → builds calendar UI
  - `renderTasks()` → displays tasks
  - `saveTasks()` → persists data

---

##  Reflection

### What I Learned
- Dynamic DOM updates
- Handling events efficiently
- Structuring interactive apps
- Using browser storage

### Challenges
- Managing date consistency
- Combining search + filter logic
- Keeping UI and data synchronized

### Improvements
- Edit tasks
- Drag-and-drop
- Backend/database integration
- Mobile optimization

---

## ⏱ Development Time

| Task | Time |
|------|------|
| Planning | 1h |
| UI (HTML/CSS) | 2h |
| Calendar Logic | 2h |
| Task System | 2h |
| Features (search, dark mode, stats) | 1.5h |
| Testing & Debugging | 1.5h |

**Total:** ~10 hours

---




