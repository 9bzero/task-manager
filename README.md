# Task Manager

Full-stack task management app — create, organize, and track tasks with a React frontend and Express + PostgreSQL backend.

## Features

- Create, edit, delete, and complete tasks
- Priority levels and due dates
- Category / project grouping
- Filter by status, priority, and category
- Search across all tasks
- REST API backend with PostgreSQL persistence
- Drizzle ORM for type-safe database access

## Stack

### Frontend
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=flat&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61dafb?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646cff?style=flat&logo=vite&logoColor=white)

### Backend
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169e1?style=flat&logo=postgresql&logoColor=white)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-c5f74f?style=flat)

## Run locally

```bash
# Install dependencies
npm install

# Set up database
DATABASE_URL=your_postgres_url npm run db:push

# Start development server
npm run dev
```

---
Made by [9bzero](https://github.com/9bzero)