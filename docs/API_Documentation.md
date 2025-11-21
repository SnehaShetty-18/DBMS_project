# API Documentation

This document provides detailed information about the API endpoints for the Alumni Networking & Mentorship System.

## Authentication

Most endpoints require authentication using JWT tokens. After logging in, include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## User Management

### Register a New User

**POST** `/api/users/register`

Registers a new user (student or alumni).

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "email": "string",
  "password": "string",
  "role": "student|alumni",
  "student_number": "string", // Required if role is student
  "major": "string", // Optional if role is student
  "year_of_study": "number", // Optional if role is student
  "graduation_year": "number", // Optional
  "company": "string", // Optional if role is alumni
  "position": "string", // Optional if role is alumni
  "industry": "string" // Optional if role is alumni
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt-token",
  "user": {
    "user_id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "role": "student|alumni"
  }
}
```

### Login

**POST** `/api/users/login`

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token",
  "user": {
    "user_id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "role": "student|alumni"
  }
}
```

### Get User Profile

**GET** `/api/users/profile`

Retrieves the authenticated user's profile information.

**Response:**
```json
{
  "user": {
    "user_id": "number",
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "phone": "string",
    "profile_picture": "string",
    "date_of_birth": "date",
    "created_at": "date",
    "updated_at": "date",
    "is_active": "boolean"
  },
  "profile": {
    // Student or Alumni specific data
  },
  "role": "student|alumni|user"
}
```

### Update User Profile

**PUT** `/api/users/profile`

Updates the authenticated user's profile information.

**Request Body:**
```json
{
  "first_name": "string",
  "last_name": "string",
  "phone": "string",
  "date_of_birth": "date",
  // Additional role-specific fields
}
```

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    // Updated user object
  },
  "profile": {
    // Updated profile object
  }
}
```

## Alumni Management

### Get All Alumni

**GET** `/api/alumni`

Retrieves a list of all alumni.

**Response:**
```json
[
  {
    "alumni_id": "number",
    "company": "string",
    "position": "string",
    "industry": "string",
    "graduation_year": "number",
    "linkedin_profile": "string",
    "is_available_for_mentorship": "boolean",
    "User": {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "profile_picture": "string"
    }
  }
]
```

### Get Alumni by ID

**GET** `/api/alumni/:id`

Retrieves a specific alumni by ID.

**Response:**
```json
{
  "alumni_id": "number",
  "company": "string",
  "position": "string",
  "industry": "string",
  "graduation_year": "number",
  "linkedin_profile": "string",
  "is_available_for_mentorship": "boolean",
  "User": {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "profile_picture": "string",
    "phone": "string"
  }
}
```

### Update Alumni Profile

**PUT** `/api/alumni/profile`

Updates the authenticated alumni's profile information.

**Request Body:**
```json
{
  "company": "string",
  "position": "string",
  "industry": "string",
  "graduation_year": "number",
  "linkedin_profile": "string",
  "is_available_for_mentorship": "boolean"
}
```

**Response:**
```json
{
  "message": "Alumni profile updated successfully",
  "alumni": {
    // Updated alumni object
  }
}
```

## Student Management

### Get All Students

**GET** `/api/students`

Retrieves a list of all students.

**Response:**
```json
[
  {
    "student_id": "number",
    "student_number": "string",
    "major": "string",
    "year_of_study": "number",
    "graduation_year": "number",
    "linkedin_profile": "string",
    "resume": "string",
    "User": {
      "first_name": "string",
      "last_name": "string",
      "email": "string",
      "profile_picture": "string"
    }
  }
]
```

### Get Student by ID

**GET** `/api/students/:id`

Retrieves a specific student by ID.

**Response:**
```json
{
  "student_id": "number",
  "student_number": "string",
  "major": "string",
  "year_of_study": "number",
  "graduation_year": "number",
  "linkedin_profile": "string",
  "resume": "string",
  "User": {
    "first_name": "string",
    "last_name": "string",
    "email": "string",
    "profile_picture": "string",
    "phone": "string"
  }
}
```

### Update Student Profile

**PUT** `/api/students/profile`

Updates the authenticated student's profile information.

**Request Body:**
```json
{
  "student_number": "string",
  "major": "string",
  "year_of_study": "number",
  "graduation_year": "number",
  "linkedin_profile": "string",
  "resume": "string"
}
```

**Response:**
```json
{
  "message": "Student profile updated successfully",
  "student": {
    // Updated student object
  }
}
```

### Create Mentorship Request

**POST** `/api/students/mentorship/request`

Creates a new mentorship request to an alumni.

**Request Body:**
```json
{
  "alumni_id": "number",
  "subject": "string",
  "message": "string"
}
```

**Response:**
```json
{
  "message": "Mentorship request created successfully",
  "request": {
    // Mentorship request object
  }
}
```

### Get Student's Mentorship Requests

**GET** `/api/students/mentorship/requests`

Retrieves all mentorship requests made by the authenticated student.

**Response:**
```json
[
  {
    "request_id": "number",
    "student_id": "number",
    "alumni_id": "number",
    "subject": "string",
    "message": "string",
    "status": "pending|accepted|rejected|completed",
    "requested_at": "date",
    "responded_at": "date",
    "Alumni": {
      "alumni_id": "number",
      "User": {
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
  }
]
```

## Mentorship Management

### Get All Mentorship Requests

**GET** `/api/mentorship`

Retrieves all mentorship requests (admin or general view).

**Response:**
```json
[
  {
    "request_id": "number",
    "student_id": "number",
    "alumni_id": "number",
    "subject": "string",
    "message": "string",
    "status": "pending|accepted|rejected|completed",
    "requested_at": "date",
    "responded_at": "date",
    "Student": {
      "student_id": "number",
      "User": {
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    },
    "Alumni": {
      "alumni_id": "number",
      "User": {
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
  }
]
```

### Get Mentorship Request by ID

**GET** `/api/mentorship/:id`

Retrieves a specific mentorship request by ID.

**Response:**
```json
{
  "request_id": "number",
  "student_id": "number",
  "alumni_id": "number",
  "subject": "string",
  "message": "string",
  "status": "pending|accepted|rejected|completed",
  "requested_at": "date",
  "responded_at": "date",
  "Student": {
    "student_id": "number",
    "User": {
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    }
  },
  "Alumni": {
    "alumni_id": "number",
    "User": {
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    }
  }
}
```

### Update Mentorship Request Status

**PUT** `/api/mentorship/:id/status`

Updates the status of a mentorship request.

**Request Body:**
```json
{
  "status": "pending|accepted|rejected|completed"
}
```

**Response:**
```json
{
  "message": "Mentorship request updated successfully",
  "request": {
    // Updated mentorship request object
  }
}
```

### Get Messages for Mentorship Request

**GET** `/api/mentorship/:requestId/messages`

Retrieves all messages for a specific mentorship request.

**Response:**
```json
[
  {
    "message_id": "number",
    "sender_id": "number",
    "receiver_id": "number",
    "mentorship_request_id": "number",
    "content": "string",
    "sent_at": "date",
    "is_read": "boolean",
    "sender": {
      "first_name": "string",
      "last_name": "string"
    },
    "receiver": {
      "first_name": "string",
      "last_name": "string"
    }
  }
]
```

### Send Message in Mentorship Request

**POST** `/api/mentorship/:requestId/messages`

Sends a new message in a mentorship request.

**Request Body:**
```json
{
  "content": "string",
  "receiver_id": "number"
}
```

**Response:**
```json
{
  "message": "Message sent successfully",
  "message": {
    // Message object
  }
}
```

## Internship Management

### Get All Internships

**GET** `/api/internships`

Retrieves all active internships.

**Response:**
```json
[
  {
    "internship_id": "number",
    "alumni_id": "number",
    "title": "string",
    "company": "string",
    "description": "string",
    "location": "string",
    "start_date": "date",
    "end_date": "date",
    "application_deadline": "date",
    "is_active": "boolean",
    "created_at": "date",
    "Alumni": {
      "alumni_id": "number",
      "User": {
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
  }
]
```

### Get Internship by ID

**GET** `/api/internships/:id`

Retrieves a specific internship by ID.

**Response:**
```json
{
  "internship_id": "number",
  "alumni_id": "number",
  "title": "string",
  "company": "string",
  "description": "string",
  "location": "string",
  "start_date": "date",
  "end_date": "date",
  "application_deadline": "date",
  "is_active": "boolean",
  "created_at": "date",
  "Alumni": {
    "alumni_id": "number",
    "User": {
      "first_name": "string",
      "last_name": "string",
      "email": "string"
    }
  }
}
```

### Create Internship

**POST** `/api/internships`

Creates a new internship (alumni only).

**Request Body:**
```json
{
  "title": "string",
  "company": "string",
  "description": "string",
  "location": "string",
  "start_date": "date",
  "end_date": "date",
  "application_deadline": "date",
  "is_active": "boolean"
}
```

**Response:**
```json
{
  "message": "Internship created successfully",
  "internship": {
    // Internship object
  }
}
```

### Update Internship

**PUT** `/api/internships/:id`

Updates an existing internship (alumni who owns it only).

**Request Body:**
```json
{
  "title": "string",
  "company": "string",
  "description": "string",
  "location": "string",
  "start_date": "date",
  "end_date": "date",
  "application_deadline": "date",
  "is_active": "boolean"
}
```

**Response:**
```json
{
  "message": "Internship updated successfully",
  "internship": {
    // Updated internship object
  }
}
```

### Delete Internship

**DELETE** `/api/internships/:id`

Deletes an internship (alumni who owns it only).

**Response:**
```json
{
  "message": "Internship deleted successfully"
}
```

### Apply for Internship

**POST** `/api/internships/:id/apply`

Applies for an internship (students only).

**Request Body:**
```json
{
  "cover_letter": "string",
  "resume": "string"
}
```

**Response:**
```json
{
  "message": "Application submitted successfully",
  "application": {
    // Application object
  }
}
```

### Get Internship Applications

**GET** `/api/internships/:id/applications`

Retrieves all applications for an internship (alumni who owns it only).

**Response:**
```json
[
  {
    "application_id": "number",
    "student_id": "number",
    "internship_id": "number",
    "cover_letter": "string",
    "resume": "string",
    "status": "pending|reviewed|accepted|rejected",
    "applied_at": "date",
    "Student": {
      "student_id": "number",
      "User": {
        "first_name": "string",
        "last_name": "string",
        "email": "string"
      }
    }
  }
]
```

## Feedback Management

### Submit Feedback

**POST** `/api/feedback`

Submits feedback for a user.

**Request Body:**
```json
{
  "to_user_id": "number",
  "mentorship_request_id": "number", // Optional
  "rating": "number", // 1-5
  "comment": "string"
}
```

**Response:**
```json
{
  "message": "Feedback submitted successfully",
  "feedback": {
    // Feedback object
  }
}
```

### Get Feedback for User

**GET** `/api/feedback/user/:userId`

Retrieves all feedback for a specific user.

**Response:**
```json
[
  {
    "feedback_id": "number",
    "from_user_id": "number",
    "to_user_id": "number",
    "mentorship_request_id": "number",
    "rating": "number",
    "comment": "string",
    "created_at": "date",
    "fromUser": {
      "first_name": "string",
      "last_name": "string"
    }
  }
]
```

### Get Feedback Given by User

**GET** `/api/feedback/given`

Retrieves all feedback given by the authenticated user.

**Response:**
```json
[
  {
    "feedback_id": "number",
    "from_user_id": "number",
    "to_user_id": "number",
    "mentorship_request_id": "number",
    "rating": "number",
    "comment": "string",
    "created_at": "date",
    "toUser": {
      "first_name": "string",
      "last_name": "string"
    }
  }
]
```

### Get User Average Rating

**GET** `/api/feedback/user/:userId/average`

Retrieves the average rating for a specific user.

**Response:**
```json
{
  "userId": "number",
  "averageRating": "number",
  "totalReviews": "number"
}
```