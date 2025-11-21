// verifyProjectStructure.js
// Script to verify that all required files have been created

const fs = require('fs');
const path = require('path');

// Define the expected file structure
const expectedFiles = [
  // Root files
  'README.md',
  
  // Backend files
  'backend/package.json',
  'backend/server.js',
  'backend/.env.example',
  'backend/initializeDatabase.js',
  'backend/testApi.js',
  'backend/config/db.js',
  'backend/models/UserModel.js',
  'backend/models/StudentModel.js',
  'backend/models/AlumniModel.js',
  'backend/models/MentorshipModel.js',
  'backend/models/MessageModel.js',
  'backend/models/InternshipModel.js',
  'backend/models/ApplicationModel.js',
  'backend/models/FeedbackModel.js',
  'backend/controllers/userController.js',
  'backend/controllers/alumniController.js',
  'backend/controllers/studentController.js',
  'backend/controllers/mentorshipController.js',
  'backend/controllers/internshipController.js',
  'backend/controllers/feedbackController.js',
  'backend/routes/userRoutes.js',
  'backend/routes/alumniRoutes.js',
  'backend/routes/studentRoutes.js',
  'backend/routes/mentorshipRoutes.js',
  'backend/routes/internshipRoutes.js',
  'backend/routes/feedbackRoutes.js',
  'backend/utils/authMiddleware.js',
  
  // Frontend files
  'frontend/package.json',
  'frontend/vite.config.js',
  'frontend/index.html',
  'frontend/src/main.jsx',
  'frontend/src/App.jsx',
  'frontend/src/App.css',
  'frontend/src/index.css',
  'frontend/src/components/Navbar.jsx',
  'frontend/src/components/Footer.jsx',
  'frontend/src/components/AlumniCard.jsx',
  'frontend/src/components/JobCard.jsx',
  'frontend/src/pages/Login.jsx',
  'frontend/src/pages/Register.jsx',
  'frontend/src/pages/Dashboard.jsx',
  'frontend/src/pages/AlumniList.jsx',
  'frontend/src/pages/MentorshipRequests.jsx',
  'frontend/src/pages/InternshipList.jsx',
  'frontend/src/pages/Feedback.jsx',
  'frontend/src/services/userService.js',
  'frontend/src/services/mentorshipService.js',
  'frontend/src/services/internshipService.js',
  'frontend/src/assets/logo.png',
  'frontend/src/assets/banner.jpg',
  
  // Database files
  'database/alumni_network.sql',
  
  // Documentation files
  'docs/ER_Diagram_Description.md',
  'docs/Project_Report_Outline.md',
  'docs/Setup_Guide.md',
  'docs/API_Documentation.md'
];

// Function to check if a file exists
function fileExists(filePath) {
  return fs.existsSync(path.join(__dirname, filePath));
}

// Verify all expected files
console.log('Verifying project structure...\n');

let allFilesExist = true;

for (const file of expectedFiles) {
  if (fileExists(file)) {
    console.log(`✓ ${file}`);
  } else {
    console.log(`✗ ${file} (MISSING)`);
    allFilesExist = false;
  }
}

console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  console.log('✓ All required files have been created successfully!');
  console.log('The project structure is complete.');
} else {
  console.log('✗ Some files are missing. Please check the list above.');
}

console.log('\nNext steps:');
console.log('1. Configure your database in backend/.env');
console.log('2. Run "npm install" in both backend and frontend directories');
console.log('3. Initialize the database with "npm run init-db" in the backend');
console.log('4. Start the development servers');