# Data Model Analysis and Reconciliation

## Current Database Schema (MySQL - Alumni Network)

### Users Table
- user_id (INT, PRIMARY KEY, AUTO_INCREMENT)
- first_name (VARCHAR(50), NOT NULL)
- last_name (VARCHAR(50), NOT NULL)
- email (VARCHAR(100), UNIQUE, NOT NULL)
- password_hash (VARCHAR(255), NOT NULL)
- phone (VARCHAR(20))
- profile_picture (VARCHAR(255))
- date_of_birth (DATE)
- created_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updated_at (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
- is_active (BOOLEAN, DEFAULT TRUE)

### Students Table
- student_id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, UNIQUE, NOT NULL, FOREIGN KEY to users)
- student_number (VARCHAR(20), UNIQUE, NOT NULL)
- major (VARCHAR(100))
- year_of_study (INT)
- graduation_year (INT)
- linkedin_profile (VARCHAR(255))
- resume (VARCHAR(255))

### Alumni Table
- alumni_id (INT, PRIMARY KEY, AUTO_INCREMENT)
- user_id (INT, UNIQUE, NOT NULL, FOREIGN KEY to users)
- company (VARCHAR(100))
- position (VARCHAR(100))
- industry (VARCHAR(100))
- graduation_year (INT)
- linkedin_profile (VARCHAR(255))
- is_available_for_mentorship (BOOLEAN, DEFAULT FALSE)

## Frontend Attributes Usage Analysis

### Student Profile Attributes (Frontend)
1. first_name (from User)
2. last_name (from User)
3. email (from User)
4. phone (from User)
5. date_of_birth (from User)
6. student_number (from Student)
7. major (from Student)
8. year_of_study (from Student)
9. graduation_year (from Student)
10. linkedin_profile (from Student)

### Alumni Profile Attributes (Frontend)
1. first_name (from User)
2. last_name (from User)
3. email (from User)
4. phone (from User)
5. date_of_birth (from User)
6. company (from Alumni)
7. position (from Alumni)
8. industry (from Alumni)
9. graduation_year (from Alumni)
10. linkedin_profile (from Alumni)
11. is_available_for_mentorship (from Alumni)

## Reconciliation Findings

### Missing Attributes in Schema
The current schema is complete and includes all attributes used in the frontend. No missing fields were identified.

### Missing Attributes in Frontend
The following attributes from the database schema are not currently displayed in the frontend:

#### Users Table
- profile_picture: Not used in frontend
- created_at: Not used in frontend
- updated_at: Not used in frontend
- is_active: Not used in frontend

#### Students Table
- resume: Not used in frontend

#### Alumni Table
- None identified

### Specific Example: LinkedIn Profile URL
The `linkedin_profile` field is already present in both the Students and Alumni tables and is being used in the frontend:
- Displayed in UserProfile component as a clickable link
- Included in EditProfile form
- Displayed in AlumniCard component

## Recommendations

1. **Schema Update**: The schema is already complete and does not require additions for the attributes currently used in the frontend.

2. **Frontend Update**: Consider adding display of the following attributes to enhance profile completeness:
   - profile_picture: Add image display capability
   - created_at: Show account creation date
   - resume: Add resume upload/view functionality for students

3. **LinkedIn Profile Enhancement**: The linkedin_profile field is already properly implemented as requested.