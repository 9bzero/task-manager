# Contributing

This project has a frontend and a backend — make sure you test both sides.

```bash
# You need a PostgreSQL database
cp .env.example .env  # add DATABASE_URL
npm install
npm run db:push       # migrations
npm run dev
```

Open an issue before working on anything significant. PRs for bug fixes can come directly.
