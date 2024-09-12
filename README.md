# men-crud-guide
Quick demo for CRUD operations using MongoDB, Express, and Node.js

**In this repository, we will cover:**

1-Create Mongoose Models (already covered)
  - Define schemas and models for your data.
    
2-Implement CRUD Operations
  Create: Add new documents to your MongoDB collections.
  Read: Retrieve documents from your MongoDB collections.
  Update: Modify existing documents in MongoDB.
  Delete: Remove documents from MongoDB collections.

3-Connect Routes to CRUD Operations
  - Create API endpoints in Express to handle each CRUD operation using the Mongoose model

4-Test CRUD Operations
  - Use tools like Postman or cURL to test your API endpoints

Practicing CRUD operations with just the MongoDB (M), Express (E), and Node.js (N) for building a solid foundation before integrating Vue.js, Angular.js, or React.js.

## NOTE:
Please be advised that this repo is built on the initial setup and essential setting that we need to establish according to my repo "MEN-Starter-Kit".

After completing all the required steps as we covered in my repo "MEN-Starter-Kit" which includes:
- Create MongoDB Collections (Atlas Cloud)
- Adding Express Server file "server.js" with the default settings
- Defining Mongoose Schemas and Models
- Preparing Environment Variables
- Run and test Server Setup

## Quick Review:
1) Initiate the package.json file
```
npm init
```

or:
```
npm init -y
```

2) Creating the server JavaScript file, by conventions:
- server.js
- app.js
- index.js
3) Installing "Express":
```
npm install express
```
4) Installing the "dotenv":
```
npm install dotenv
```
5) installing mongoose
```
npm install mongoose
```
6) Adding the Express Template contents
7) Adding the Environment Variable file with the required code for .env and in the server file
8) Adding the initial code for "mongoose" besides Express template and .ENV variable as shown below:

**NOTE:**
we can install all in one command:
```
npm install mongoose dotenv express
```
```js
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
```
We can now proceed with CRUD operations

# Our Atlas MongoDB:
- database: abc-college
- collection: "employees"
- one document sample:
```
{
  "_id": "6685c1acc3ce6380ffdd0004",
  "employee_id": "emp123",
  "name": "Alex Chow",
  "email": "alex@college.com",
  "position": "Instructor",
  "age": 58,
  "date_hired": "2024-07-03"
}
```

### To be continued...