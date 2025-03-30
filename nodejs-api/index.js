const express = require('express');
const dotenv = require('dotenv');
const logger = require('./utils/logger');

// Load the appropriate .env file based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({path: __dirname +  envFile.trim() });

logger.info(`Current NODE_ENV: ${process.env.NODE_ENV}`);
logger.info(`Loading environment file: ${envFile}`);

const app = express();
const port = process.env.PORT || 5001; // Use the PORT variable from .env or default to 3000

const DB_URL = process.env.DBURL;
logger.info("Port :" +port)
logger.info("DB :" +DB_URL)

// Middleware
app.use(express.json());

app.get('/', (req, res) => {
    const datePart = new Date().toISOString().split("T")[0]
    const timePart = new Date().toLocaleString("en-US", {hour12: false}).split(",")[1]
    const timeStamp = datePart + timePart
    logger.info("Healthcheck done at : "+timeStamp)
    logger.info("Connected to "+DB_URL)
    return res.status(200).json({ status: 'OK', service: 'Basic', timestamp: timeStamp });
  
  });

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
