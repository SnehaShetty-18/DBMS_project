const axios = require('axios');

async function testRegistration() {
  try {
    console.log('Testing user registration...');
    
    const userData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test.user@example.com',
      password: 'password123',
      role: 'student',
      student_number: 'S123456',
      major: 'Computer Science',
      year_of_study: 3,
      graduation_year: 2024
    };
    
    console.log('Sending registration request with data:', userData);
    
    const response = await axios.post('http://localhost:5000/api/users/register', userData);
    console.log('Registration response:', response.data);
  } catch (error) {
    console.error('Registration error:', error.response ? error.response.data : error.message);
  }
}

testRegistration();