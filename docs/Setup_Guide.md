# Alumni Networking & Mentorship System - Setup Guide

This guide will help you set up the Alumni Networking & Mentorship System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Alumni_Networking_DBMS
```

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Edit the `.env` file and configure your environment variables:
   - Set your MySQL database credentials
   - Set a strong JWT secret key

5. Initialize the database:
   ```bash
   npm run init-db
   ```

6. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 4. Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. The backend API will be running at `http://localhost:5000`

## Testing the API

To test the API endpoints, you can run:
```bash
npm run test-api
```

## Database Schema

The database schema is defined in `database/alumni_network.sql`. You can import this file directly into your MySQL database if needed.

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure MySQL is running
   - Verify database credentials in `.env`
   - Check if the database exists

2. **Port Conflicts**
   - Change the PORT in `.env` if 5000 is already in use
   - Change the frontend port in `vite.config.js` if 3000 is already in use

3. **Dependency Installation Issues**
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json` and reinstall

## Development Workflow

1. Make changes to the backend in the `backend/` directory
2. Make changes to the frontend in the `frontend/` directory
3. Both servers will automatically reload on changes
4. View the application at `http://localhost:3000`

## Deployment

For production deployment:
1. Build the frontend:
   ```bash
   npm run build
   ```
2. Use a process manager like PM2 for the backend:
   ```bash
   pm2 start server.js
   ```
3. Serve the frontend build files through a web server like Nginx

## Additional Resources

- [Project Documentation](../README.md)
- [Database Schema](../database/alumni_network.sql)
- [API Endpoints](../docs/API_Documentation.md)