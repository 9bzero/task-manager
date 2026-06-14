<div align="center">

  # Task Manager

  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
  [![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)
  [![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

  **A full-stack task management application with a REST API, real-time dashboard, and filtering.**

  </div>

  ---

  ## Features

  - **Dashboard** — live stats: total tasks, by status, by priority
  - **CRUD** — create, view, update, and delete tasks
  - **Filtering** — filter by status (Todo / In Progress / Done) and priority (Low / Medium / High / Urgent)
  - **REST API** — 6 typed endpoints with Zod validation
  - **Type-safe DB** — Drizzle ORM with full TypeScript inference

  ## Tech Stack

  | Layer | Technology |
  |-------|-----------|
  | Frontend | React 18, TypeScript, Tailwind CSS v4, TanStack Query |
  | Backend | Express 5, Node.js, Zod |
  | Database | PostgreSQL, Drizzle ORM |
  | Build | Vite, esbuild |

  ## API Reference

  | Method | Endpoint | Description |
  |--------|----------|-------------|
  | `GET` | `/api/tasks` | List all tasks |
  | `POST` | `/api/tasks` | Create a task |
  | `GET` | `/api/tasks/:id` | Get task by ID |
  | `PATCH` | `/api/tasks/:id` | Update task |
  | `DELETE` | `/api/tasks/:id` | Delete task |
  | `GET` | `/api/tasks/stats` | Get statistics |

  ## Getting Started

  ```bash
  # Install dependencies
  npm install

  # Set environment variable
  echo "DATABASE_URL=postgresql://user:password@localhost:5432/taskdb" > .env

  # Push schema to database
  npm run db:push

  # Start development server
  npm run dev
  ```

  ## Project Structure

  ```
  ├── src/                    # React frontend
  │   ├── pages/
  │   │   ├── dashboard.tsx   # Main dashboard view
  │   │   └── task-form.tsx   # Create/edit form
  │   └── App.tsx
  ├── server/                 # Express API server
  │   ├── routes/tasks.ts     # Task endpoints
  │   └── index.ts
  └── lib/db/                 # Drizzle schema & connection
      └── schema.ts
  ```

  ---

  <div align="center">Made with TypeScript · Part of my <a href="https://github.com/9bzero">developer portfolio</a></div>
  