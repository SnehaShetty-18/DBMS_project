// checkDatabase.js
// Script to check if student registration data is stored in the database

const sequelize = require('./config/db');
const User = require('./models/UserModel');
const Student = require('./models/StudentModel');

const checkDatabase = async () => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✓ Database connected successfully');
    
    // Check users table
    console.log('\n1. Checking Users table:');
    const users = await User.findAll();
    console.log(`Found ${users.length} user(s) in the database:`);
    users.forEach(user => {
      console.log(`  - ID: ${user.user_id}, Name: ${user.first_name} ${user.last_name}, Email: ${user.email}`);
    });
    
    // Check students table
    console.log('\n2. Checking Students table:');
    const students = await Student.findAll({
      include: [{
        model: User,
        attributes: ['first_name', 'last_name', 'email']
      }]
    });
    console.log(`Found ${students.length} student(s) in the database:`);
    students.forEach(student => {
      console.log(`  - Student ID: ${student.student_id}, User: ${student.User.first_name} ${student.User.last_name}, Student Number: ${student.student_number}`);
    });
    
    if (users.length === 0 && students.length === 0) {
      console.log('  No data found in the database. Student registration may not have been successful.');
    } else {
      console.log('\n🎉 Database contains registration data!');
    }
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    await sequelize.close();
  }
};

checkDatabase();