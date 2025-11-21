// findUser.js
// Script to find a specific user in the database by name

const sequelize = require('./config/db');
const User = require('./models/UserModel');
const Student = require('./models/StudentModel');

const findUser = async (firstName, lastName) => {
  try {
    // Authenticate database connection
    await sequelize.authenticate();
    console.log('✓ Database connected successfully');
    
    // Search for user by first name and last name
    console.log(`\nSearching for user: ${firstName} ${lastName}`);
    const user = await User.findOne({
      where: {
        first_name: firstName,
        last_name: lastName
      }
    });
    
    if (!user) {
      console.log(`❌ User "${firstName} ${lastName}" not found in the database.`);
      
      // Let's list all users to see who is registered
      console.log('\nAll registered users:');
      const allUsers = await User.findAll();
      if (allUsers.length === 0) {
        console.log('  No users found in the database.');
      } else {
        allUsers.forEach(u => {
          console.log(`  - ${u.first_name} ${u.last_name} (${u.email})`);
        });
      }
      return;
    }
    
    console.log(`✓ User found: ${user.first_name} ${user.last_name} (${user.email})`);
    console.log(`  User ID: ${user.user_id}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  Created: ${user.created_at}`);
    
    // Check if this user is a student
    const student = await Student.findOne({
      where: {
        user_id: user.user_id
      }
    });
    
    if (student) {
      console.log('\n🎓 This user is registered as a student:');
      console.log(`  Student ID: ${student.student_id}`);
      console.log(`  Student Number: ${student.student_number}`);
      console.log(`  Major: ${student.major || 'Not specified'}`);
      console.log(`  Year of Study: ${student.year_of_study || 'Not specified'}`);
      console.log(`  Graduation Year: ${student.graduation_year || 'Not specified'}`);
    } else {
      console.log('\n📝 This user is not registered as a student (might be alumni).');
    }
    
  } catch (error) {
    console.error('❌ Error searching database:', error.message);
  } finally {
    await sequelize.close();
  }
};

// Get command line arguments
const args = process.argv.slice(2);
if (args.length >= 2) {
  findUser(args[0], args[1]);
} else {
  console.log('Usage: node findUser.js <first_name> <last_name>');
  console.log('Example: node findUser.js Sneha Smith');
}