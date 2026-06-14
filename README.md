# Task Manager

A full-stack task management application built with React, Express, PostgreSQL, and Drizzle ORM.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, TanStack Query, Wouter
- **Backend**: Express 5, Node.js
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod
- **Build**: Vite

## Features

- Create, update, and delete tasks
- Filter by status (Todo, In Progress, Done) and priority (Low, Medium, High, Urgent)
- Dashboard with live stats
- REST API with full CRUD

## Getting Started

```bash
pnpm install
pnpm run dev
```

Requires `DATABASE_URL` environment variable pointing to a PostgreSQL database.

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/tasks | List all tasks |
| POST | /api/tasks | Create a task |
| GET | /api/tasks/:id | Get a task |
| PATCH | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |
| GET | /api/tasks/stats | Get task statistics |
