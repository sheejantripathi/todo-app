import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if required environment variables are set
if (!process.env.DB_NAME || !process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_HOST) {
  throw new Error('Missing required environment variables for database connection');
}


//setup database connection
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

export default sequelize;
