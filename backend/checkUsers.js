require('dotenv').config();
const User = require('./models/UserModel');
const Student = require('./models/StudentModel');
const Alumni = require('./models/AlumniModel');
const sequelize = require('./config/db');

async function checkDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    
    // Check users
    const users = await User.findAll();
    console.log('\n=== USERS ===');
    console.log('Total users:', users.length);
    users.forEach(user => {
      console.log(`ID: ${user.user_id}, Email: ${user.email}, Name: ${user.first_name} ${user.last_name}`);
    });
    
    // Check students
    const students = await Student.findAll();
    console.log('\n=== STUDENTS ===');
    console.log('Total students:', students.length);
    students.forEach(student => {
      console.log(`ID: ${student.student_id}, User ID: ${student.user_id}, Student Number: ${student.student_number}`);
    });
    
    // Check alumni
    const alumni = await Alumni.findAll();
    console.log('\n=== ALUMNI ===');
    console.log('Total alumni:', alumni.length);
    alumni.forEach(alum => {
      console.log(`ID: ${alum.alumni_id}, User ID: ${alum.user_id}, Company: ${alum.company}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkDatabase();