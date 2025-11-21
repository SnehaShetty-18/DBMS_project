-- Script to update existing database tables with new columns
-- Run this script in MySQL Workbench to add the missing columns

-- First, check if the columns exist
-- If they don't exist, these commands will add them

-- Add university column to students table
ALTER TABLE students 
ADD COLUMN university VARCHAR(100) AFTER graduation_year;

-- Add university column to alumni table
ALTER TABLE alumni 
ADD COLUMN university VARCHAR(100) AFTER graduation_year;

-- Add years_of_experience column to alumni table
ALTER TABLE alumni 
ADD COLUMN years_of_experience INT AFTER is_available_for_mentorship;

-- Verify the changes
DESCRIBE students;
DESCRIBE alumni;