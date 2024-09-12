/* 
Notice for more details about the initial setup and connection,
review my repo "MEN Starter Kit" :
Link: https://github.com/anmarjarjees/men-starter-kit
*/
// STEP#1: Module Imports:
// 1) Import the express module to set up a web server

import express from 'express';

// 2) Import the mongoose module for working with MongoDB

import mongoose from 'mongoose';


// 3) Import "dotenv" for environment variables
// dotenv is used to load environment variables from the .env file into process.env
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
/*
The .config() function reads the .env file 
and makes its key-value pairs available in process.env
*/

// STEP#2: Express Application Setup:
// Create an instance of an Express application
const app = express();

// Define the port number where the server will listen for requests
const port = 3000;

// A better practice: using an environment variable for the MongoDB connection string from the .env file
const mongoURI = process.env.MONGO_URI;

// STEP#3: MongoDB Connection:
// MongoDB connection using async/await based on Mongoose documentation
async function main() {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');
}

// Connect to the MongoDB database and handle any errors
main().catch(err => console.log('MongoDB connection error:', err));
/* 
To summarize:
> The main() function is async, meaning it returns a promise.
> If there's an error in the await mongoose.connect(), the promise is rejected.
> The .catch() attached to main() will handle the error, logging it with console.log(err).
*/

// STEP#4: Routes
// Root Route ('/'): Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// STEP#5: Starting the Server (Server Initialization)
// Start the Express server, listening on the specified port (3000)
// Logs a message when the server is running
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});