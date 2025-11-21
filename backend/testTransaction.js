const sequelize = require('./config/db');

async function testTransaction() {
  try {
    console.log('Testing sequelize connection...');
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    console.log('Testing transaction creation...');
    const transaction = await sequelize.transaction();
    console.log('Transaction created successfully:', transaction);
    
    // Rollback the transaction
    await transaction.rollback();
    console.log('Transaction rolled back successfully.');
  } catch (error) {
    console.error('Error in testTransaction:', error);
  }
}

testTransaction();