# Entity Relationship Diagram Description

This document describes the entity relationships in the Alumni Networking & Mentorship System.

## Entities and Relationships

### 1. Users
- **Primary Key**: user_id
- **Attributes**: first_name, last_name, email, password_hash, phone, profile_picture, date_of_birth, created_at, updated_at, is_active
- **Description**: Base entity for all users (students and alumni)

### 2. Students
- **Primary Key**: student_id
- **Foreign Key**: user_id (references Users)
- **Attributes**: student_number, major, year_of_study, graduation_year, linkedin_profile, resume
- **Description**: Extended information for student users

### 3. Alumni
- **Primary Key**: alumni_id
- **Foreign Key**: user_id (references Users)
- **Attributes**: company, position, industry, graduation_year, linkedin_profile, is_available_for_mentorship
- **Description**: Extended information for alumni users

### 4. Mentorship Requests
- **Primary Key**: request_id
- **Foreign Keys**: 
  - student_id (references Students)
  - alumni_id (references Alumni)
- **Attributes**: subject, message, status, requested_at, responded_at
- **Description**: Requests for mentorship from students to alumni

### 5. Messages
- **Primary Key**: message_id
- **Foreign Keys**: 
  - sender_id (references Users)
  - receiver_id (references Users)
  - mentorship_request_id (references Mentorship Requests, nullable)
- **Attributes**: content, sent_at, is_read
- **Description**: Messages between users, optionally related to mentorship requests

### 6. Internships
- **Primary Key**: internship_id
- **Foreign Key**: alumni_id (references Alumni)
- **Attributes**: title, company, description, location, start_date, end_date, application_deadline, is_active, created_at
- **Description**: Internship opportunities posted by alumni

### 7. Applications
- **Primary Key**: application_id
- **Foreign Keys**: 
  - student_id (references Students)
  - internship_id (references Internships)
- **Attributes**: cover_letter, resume, status, applied_at
- **Description**: Student applications for internships

### 8. Feedback
- **Primary Key**: feedback_id
- **Foreign Keys**: 
  - from_user_id (references Users)
  - to_user_id (references Users)
  - mentorship_request_id (references Mentorship Requests, nullable)
- **Attributes**: rating, comment, created_at
- **Description**: Feedback from users to other users, optionally related to mentorship requests

## Relationships

1. **Users** ←→ **Students** (1:1)
   - Each user can have at most one student profile
   - Each student profile belongs to exactly one user

2. **Users** ←→ **Alumni** (1:1)
   - Each user can have at most one alumni profile
   - Each alumni profile belongs to exactly one user

3. **Students** ←→ **Mentorship Requests** (1:N)
   - Each student can make multiple mentorship requests
   - Each mentorship request belongs to exactly one student

4. **Alumni** ←→ **Mentorship Requests** (1:N)
   - Each alumni can receive multiple mentorship requests
   - Each mentorship request is directed to exactly one alumni

5. **Users** ←→ **Messages** (1:N as sender)
   - Each user can send multiple messages
   - Each message is sent by exactly one user

6. **Users** ←→ **Messages** (1:N as receiver)
   - Each user can receive multiple messages
   - Each message is received by exactly one user

7. **Mentorship Requests** ←→ **Messages** (1:N)
   - Each mentorship request can have multiple related messages
   - Each message can be related to at most one mentorship request

8. **Alumni** ←→ **Internships** (1:N)
   - Each alumni can post multiple internships
   - Each internship is posted by exactly one alumni

9. **Students** ←→ **Applications** (1:N)
   - Each student can make multiple applications
   - Each application is made by exactly one student

10. **Internships** ←→ **Applications** (1:N)
    - Each internship can receive multiple applications
    - Each application is for exactly one internship

11. **Users** ←→ **Feedback** (1:N as giver)
    - Each user can give multiple feedbacks
    - Each feedback is given by exactly one user

12. **Users** ←→ **Feedback** (1:N as receiver)
    - Each user can receive multiple feedbacks
    - Each feedback is given to exactly one user

13. **Mentorship Requests** ←→ **Feedback** (1:1)
    - Each mentorship request can have at most one feedback
    - Each feedback can be related to at most one mentorship request