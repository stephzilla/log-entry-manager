# Log Entry Manager

A full stack web application for managing log entries.

## Features

- Create, read, update, and delete log entries
- Auto-fill user name based on previous entries
- Responsive design that works on both mobile and desktop
- Local data storage using SQLite

## Technologies Used

- **Frontend**: React, TypeScript, CSS
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (using better-sqlite3)
- **Testing**: Vitest, React Testing Library

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation and Setup

### Clone the repository

```bash
git clone https://github.com/stephzilla/log-entry-manager.git
cd log-entry-manager
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

The server will start at http://localhost:3001

### Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

The client will start at http://localhost:3000

## Running Tests

### Backend Tests

```bash
cd server
npm test
```

### Frontend Tests

```bash
cd client
npm test
```

## Project Structure

```
log-entry-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript interfaces
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── models/         # Data models
│   │   └── routes/         # API routes
│   └── logentries.db       # SQLite database file
└── README.md               # Project documentation
```

## API Endpoints

- `GET /api/logentries` - Get all log entries
- `GET /api/logentries/:id` - Get a specific log entry
- `POST /api/logentries` - Create a new log entry
- `PUT /api/logentries/:id` - Update a log entry
- `DELETE /api/logentries/:id` - Delete a log entry
- `GET /api/logentries/user/recent` - Get the most recent user name

## License

MIT