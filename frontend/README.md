# Task Manager App - Frontend

React frontend for the Task Manager App built with Vite, Tailwind CSS, and Axios.

## Features

- **Modern React** with Vite for fast development
- **Tailwind CSS** for responsive, clean styling
- **Task Management**:
  - View all tasks in a responsive grid
  - Add new tasks with title, description, and status
  - Edit existing tasks
  - Delete tasks with confirmation
  - Toggle task status (pending → in_progress → completed)
- **Loading states** and error handling
- **Component-based architecture**
- **API integration** with backend at `http://localhost:5000`

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   ├── TaskList.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── Dockerfile
├── nginx.conf
└── README.md
```

## Requirements

- Node.js 18+
- npm or yarn
- Backend API running on port 5000

## Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file (optional, defaults to `http://localhost:5000`):
```env
VITE_API_BASE_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## API Integration

The frontend connects to the backend API using Axios. The API base URL can be configured via the `VITE_API_BASE_URL` environment variable (defaults to `http://localhost:5000`).

Endpoints used:
- `GET /tasks` - Fetch all tasks
- `GET /tasks/:id` - Get task by ID
- `POST /tasks` - Create new task
- `PUT /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task

## Docker Deployment

### Build and Run

```bash
cd frontend
docker build -t task-manager-frontend .
docker run --name task-manager-frontend --rm -p 3000:80 task-manager-frontend
```

The app will be available at `http://localhost:3000`

### Docker Compose (with backend)

For production deployment with the backend, use Docker Compose or configure nginx to proxy API requests. The included `nginx.conf` provides a basic configuration for proxying API requests to the backend.

## Component Structure

- **App.jsx** - Main application component with state management
- **TaskList** - Container for displaying all tasks in a grid
- **TaskItem** - Individual task card with actions
- **TaskForm** - Form for creating/editing tasks
- **LoadingSpinner** - Loading indicator component
- **ErrorMessage** - Error display component

## Styling

The app uses Tailwind CSS with a clean, minimal design. It's fully responsive and works on mobile, tablet, and desktop devices.

## Production Notes

- Build the app with `npm run build` before deploying
- The Dockerfile uses a multi-stage build with nginx for production
- Configure CORS on the backend to allow your frontend domain
- Update `VITE_API_BASE_URL` environment variable for production builds

