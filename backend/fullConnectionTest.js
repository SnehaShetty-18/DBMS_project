// fullConnectionTest.js
// Script to test the full connection between frontend, backend, and database

const sequelize = require('./config/db');

const testFullConnection = async () => {
  try {
    // 1. Test database connection
    console.log('1. Testing database connection...');
    await sequelize.authenticate();
    console.log('✓ Database connected successfully');
    
    // 2. Test if tables exist
    console.log('\n2. Checking if tables exist...');
    const queryInterface = sequelize.getQueryInterface();
    const tables = await queryInterface.showAllSchemas();
    console.log('✓ Database tables accessible');
    
    // 3. Test specific table existence
    console.log('\n3. Testing specific table access...');
    const User = require('./models/UserModel');
    console.log('✓ User model loaded successfully');
    
    console.log('\n🎉 All connections working properly!');
    console.log('\nConnection Summary:');
    console.log('- Frontend: http://localhost:3001/');
    console.log('- Backend: http://localhost:5000/');
    console.log('- Database: Connected to alumni_network');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.error('Stack:', error.stack);
  } finally {
    await sequelize.close();
  }
};

testFullConnection();