# Alumni Networking & Mentorship System

A comprehensive platform connecting alumni and students for networking and mentorship opportunities.

## Prerequisites

1. Node.js (version 14 or higher)
2. MySQL Server
3. Git (optional, for cloning the repository)

## Setup Instructions

### 1. Install MySQL

- Download and install MySQL Community Server from [https://dev.mysql.com/downloads/mysql/](https://dev.mysql.com/downloads/mysql/)
- During installation:
  - Select "Server only" or "Developer Default"
  - Set the root password to: `@suru4765910*` (matches the .env file)
  - Make sure to add MySQL to your system PATH

### 2. Start MySQL Service

- On Windows, open Services (services.msc)
- Find "MySQL" or "MySQL80" service
- Right-click and select "Start"

### 3. Create Database

Open a command prompt and run:
```sql
mysql -u root -p
```

Enter the password: `@suru4765910*`

Then create the database:
```sql
CREATE DATABASE alumni_network;
EXIT
```

### 4. Install Dependencies

Navigate to the project root directory and run:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Initialize Database

From the backend directory:
```bash
node initializeDatabase.js
```

### 6. Run the Application

You have two options:

#### Option 1: Using Batch Scripts (Windows)

Double-click on `run_application.bat` in the project root directory.

#### Option 2: Manual Start

Terminal 1 (Backend):
```bash
cd backend
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Troubleshooting

### Database Connection Issues

If you see "ECONNREFUSED" errors:
1. Ensure MySQL service is running
2. Verify the database credentials in `backend/.env`
3. Confirm the `alumni_network` database exists

### Port Already in Use

If you see "EADDRINUSE" errors:
1. Change the PORT in `backend/.env`
2. Or kill the process using port 5000:
   ```bash
   taskkill /f /im node.exe
   ```

## API Endpoints

- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Login
- GET `/api/users/profile` - Get user profile (protected)
- PUT `/api/users/profile` - Update user profile (protected)
- GET `/api/alumni` - Get all alumni (protected)
- GET `/api/students` - Get all students (protected)
- POST `/api/mentorship/request` - Send mentorship request (protected)
- POST `/api/internships` - Post internship (alumni only, protected)
- POST `/api/applications` - Apply for internship (student only, protected)

## Environment Variables

Check `backend/.env` for configuration:
- PORT: Server port (default: 5000)
- DB_HOST: Database host (default: localhost)
- DB_USER: Database user (default: root)
- DB_PASSWORD: Database password (default: @suru4765910*)
- DB_NAME: Database name (default: alumni_network)
- JWT_SECRET: Secret for JWT tokens
- JWT_EXPIRES_IN: Token expiration time
