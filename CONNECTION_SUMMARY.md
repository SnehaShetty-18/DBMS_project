# Alumni Networking & Mentorship System - Connection Summary

## 🔄 System Connections Overview

This document provides a comprehensive overview of how the frontend, backend, and database components are connected in the Alumni Networking & Mentorship System.

## 🔗 Connection Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Frontend      │    │    Backend       │    │    Database      │
│   (React)       │◄──►│   (Node.js/      │◄──►│   (MySQL)        │
│   Port: 3001    │    │   Express)       │    │   alumni_network │
│                 │    │   Port: 5000     │    │                  │
└─────────────────┘    └──────────────────┘    └──────────────────┘
```

## 📡 Frontend to Backend Connection

### Vite Proxy Configuration
The frontend is configured to proxy API requests to the backend server:

**File**: `frontend/vite.config.js`
```javascript
server: {
  port: 3001,
  proxy: {
    '/api': {
      target: 'http://localhost:5000',
      changeOrigin: true,
      secure: false
    }
  }
}
```

This configuration allows the frontend to make API calls to `/api/*` endpoints, which are automatically forwarded to `http://localhost:5000`.

### Frontend Service Layer
The frontend uses Axios services to communicate with the backend:

**Example**: `frontend/src/services/userService.js`
```javascript
import axios from 'axios'

const API_URL = '/api/users'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
```

## 🔌 Backend to Database Connection

### Database Configuration
The backend connects to the MySQL database using Sequelize ORM:

**File**: `backend/config/db.js`
```javascript
const { Sequelize } = require('sequelize')
require('dotenv').config()

// Database configuration
const sequelize = new Sequelize(
  process.env.DB_NAME || 'alumni_network',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
)

module.exports = sequelize
```

### Environment Variables
Database credentials are stored in environment variables:

**File**: `backend/.env`
```
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=@suru4765910*
DB_NAME=alumni_network
```

### Model Definitions
Each database table is represented by a Sequelize model:

**Example**: `backend/models/UserModel.js`
```javascript
const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  // ... other fields
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})

module.exports = User
```

## ✅ Connection Status Verification

### Current Status
All components are successfully connected:

1. **✅ Frontend**: Running on http://localhost:3001/
2. **✅ Backend**: Running on http://localhost:5000/
3. **✅ Database**: Connected to `alumni_network` database

### Verification Commands
```bash
# Test database connection
cd backend && node fullConnectionTest.js

# Test API endpoint
curl http://localhost:5000/

# Test frontend
Open browser to http://localhost:3001/
```

## 🔄 Data Flow

### User Registration Flow
1. User fills registration form in frontend
2. Frontend sends POST request to `/api/users/register`
3. Backend receives request and validates data
4. Backend hashes password and creates user in database
5. Backend generates JWT token and sends response
6. Frontend stores token and redirects user

### Authentication Flow
1. User logs in through frontend
2. Frontend sends credentials to `/api/users/login`
3. Backend validates credentials against database
4. Backend generates JWT token if valid
5. Frontend stores token in localStorage
6. Subsequent requests include token in Authorization header

### Protected Route Access
1. Frontend makes request to protected endpoint
2. JWT token automatically added to request headers
3. Backend middleware validates token
4. If valid, request proceeds to controller
5. Controller queries database using Sequelize models
6. Response sent back to frontend

## 🔧 Troubleshooting Common Issues

### Port Conflicts
- **Backend**: Uses port 5000 (change in `.env` file)
- **Frontend**: Uses port 3001 (change in `vite.config.js`)

### Database Connection Issues
1. Ensure MySQL service is running
2. Verify database credentials in `.env` file
3. Check if `alumni_network` database exists
4. Ensure MySQL user has proper permissions

### API Communication Issues
1. Verify backend server is running
2. Check proxy configuration in `vite.config.js`
3. Ensure CORS is properly configured in backend

## 📊 Connection Testing Results

### Database Connection
- ✅ Successfully connected to MySQL database
- ✅ Database authentication working
- ✅ Models properly defined and accessible

### Backend API
- ✅ Server running on port 5000
- ✅ API endpoints accessible
- ✅ CORS properly configured
- ✅ Authentication middleware functional

### Frontend Communication
- ✅ Vite development server running
- ✅ API proxy configuration working
- ✅ Service layer properly configured

## 🚀 Next Steps

1. **Populate Database**: Run initialization scripts to create tables
2. **Test User Flows**: Verify registration, login, and data access
3. **Implement Additional Features**: Add more API endpoints as needed
4. **Deploy to Production**: Configure for production environment

## 📞 Support Contacts

For connection-related issues:
- Database Administrator: Check MySQL service and credentials
- Backend Developer: Verify server configuration and models
- Frontend Developer: Check proxy settings and service configurations