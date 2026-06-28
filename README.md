# task-manager

Full-stack task management app. React frontend, Express API, PostgreSQL database, Drizzle ORM.

## Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express 5
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod

## Features

- Create, edit, and delete tasks
- Priority levels (Low / Medium / High / Critical) and due dates
- Category grouping and filters
- Search across all tasks
- Full REST API — all state lives in PostgreSQL, nothing in localStorage

## Setup

```bash
# You need a PostgreSQL database
# Copy .env.example to .env and add your DATABASE_URL

npm install
npm run db:push   # run migrations
npm run dev       # starts both frontend and API
```

## API

```
GET    /api/tasks
POST   /api/tasks
PATCH  /api/tasks/:id
DELETE /api/tasks/:id
```

## Notes

Auth is not implemented — this is a single-user local app. If you expose the API publicly without adding auth, anyone can read and modify your tasks. Planning to add Clerk auth at some point.