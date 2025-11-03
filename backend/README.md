## Task Manager App - Backend

Node.js + Express backend using PostgreSQL and Sequelize.

### Features
- Express server on port 5000
- CRUD for tasks (`/tasks`)
- PostgreSQL via Sequelize ORM
- Security (helmet), CORS, compression
- Logging with morgan + winston
- Centralized error handling
- Dockerfile for containerized deployment

### Folder Structure
```
backend/
├── src/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   └── app.js
├── package.json
├── Dockerfile
├── .env.example
└── README.md
```

### Requirements
- Node.js 18+
- PostgreSQL 13+

### Environment Variables
Create a `.env` file in `backend/` based on `.env.example`:

```
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=task_manager_db
DB_SYNC_FORCE=false
```

Notes:
- `DB_SYNC_FORCE=true` will drop and recreate tables on startup (dev only).

### Install & Run (Local)
```
cd backend
npm install
npm run dev
```
Server runs at http://localhost:5000

### API Endpoints
- `GET /tasks` – list all tasks
- `GET /tasks/:id` – get task by id
- `POST /tasks` – create task (JSON: { title, description?, status? })
- `PUT /tasks/:id` – update task (any of { title, description, status })
- `DELETE /tasks/:id` – delete task

Statuses: `pending | in_progress | completed`.

### Docker
Build and run:
```
cd backend
docker build -t task-manager-backend .
docker run --name task-manager-backend --rm -p 5000:5000 \
  -e NODE_ENV=production \
  -e PORT=5000 \
  -e DB_HOST=host.docker.internal \
  -e DB_PORT=5432 \
  -e DB_USER=postgres \
  -e DB_PASS=postgres \
  -e DB_NAME=task_manager_db \
  task-manager-backend
```

If your PostgreSQL is also running in Docker, adjust `DB_HOST` to the network alias or container name and connect both containers to the same Docker network.

### Production Notes
- Prefer Sequelize migrations for schema changes (this sample uses `sync` for simplicity).
- Use a production-ready PostgreSQL instance and strong credentials.
- Keep `.env` out of version control.


