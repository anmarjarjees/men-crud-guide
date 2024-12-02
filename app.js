/* 
In this file:
 - Set up the Express app 
 - Connect to the MongoDB database using Mongoose
 - Import the routes for creating, reading, updating, and deleting employees
*/

// Always starting by importing the necessary packages:
// Using Express for handling HTTP requests.
import express from 'express';

// Using Mongoose to interact with MongoDB.
import mongoose from 'mongoose';

// Using "dotenv" package for loading the environment variable from the .env file
// this variable contains the MongoDB connection URI
import dotenv from 'dotenv';

// Import the CRUD routes:

// Import the create employee route
import createEmployeeRoute from './routes/createEmployee.js';
/* 
NOTE:
****
The name "createEmployeeRoute" is just an alias for the module we're importing
It's just a variable name that will refer to whatever is exported from the createEmployee.js file

we just ended the name with the word "Route" to help us easily understand
that this is the route for creating employees
*/

// So on for importing reading, updating, and deleting routes...
// We can import other routes (like reading, updating, deleting) in a similar way:
import readEmployeeRoute from './routes/readEmployee.js';
import updateEmployeeRoute from './routes/updateEmployee.js';
import deleteEmployeeRoute from './routes/deleteEmployee.js';

// Loading environment variable(s) from the .env file
dotenv.config();
/* 
This will include the .env file in our application process (process.env)
So later we can access it like "process.env.VARIABLE_NAME" in your code
*/

// Initialize express app (Creating an instance of the Express app)
const app = express();

// Middleware for JSON (Middleware to parse JSON requests):
/* 
Using middleware to parse incoming JSON requests,
we included express.json() to parse incoming JSON requests, 
which is necessary for handling POST (Create), PUT (Update) requests
*/
app.use(express.json());

// MongoDB URI from environment variables
const mongoURI = process.env.MONGO_URI;
/* 
Notice that database name is typically specified in the MongoDB connection string "mongoURI",
not in the schema or model.
When we connect to MongoDB, we're connecting to a specific database.
Our database is named "abc-college".

Example URI:
mongodb+srv://username:password@cluster0.mongodb.net/abc-college?retryWrites=true&w=majority

In this example, the database name is abc-college, 
and this is defined in the URI (mongodb.net/abc-college)
*/

/* 
If MONGO_URI is not defined, log an error and stop the process.
It is a basic needed check to ensure our app doesn't run without a database connection string.
*/
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables!');
    // Exit the process with a non-zero status code (failure)
    // If the MongoDB connection fails, stop the app with an error code (1)
    // This indicates the process ended with a failure, not a normal exit.
    process.exit(1);
    /* 
    To review:
    - In Node.js, process.exit() method is used to end the running process
    - The argument passed to process.exit() is a status code that indicates the success or failure of the process:
        > process.exit(0): 
            0 status code indicates that the process completed successfully (normal exit)
        > process.exit(1): 
            1 status code indicates that there was an error or the process ended with an error
        
    Notice that "1" is just a common convention in programming:
    - 0 means everything went well
    - any non-zero number (like 1) means an error occurred

    Link: https://nodejs.org/api/process.html#processexitcode
    */
}

// MongoDB connection
async function main() {
    try {
        // Using the mongoose.connect() method to connect to MongoDB with the URI
        await mongoose.connect(mongoURI, {
            /* 
            NOTE TO REVIEW:
            - Since Mongoose 6, these options are no longer necessary:
            - These options are just for backward compatibility (Mongoose 5 and below)
            - Yes, we can ignore them :-)
            */
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Mongoose 6+ does not require useNewUrlParser or useUnifiedTopology
        // await mongoose.connect(mongoURI);

        // For testing: Print a message to confirm connection
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        // Exit the process if MongoDB connection fails:
        process.exit(1);
    }
}

// Call the function to connect to the database
main();

// Calling the employee routes (CRUD operations):
// Use the createEmployee route with app.use()
/* 
Remember that => app.use(createEmployeeRoute)
which is the "POST" route for Create would be available at:
URL => http://localhost:3000/api/employees
*/

/* 
We can add a "Path Prefix" like "api/employees" to organize and better structure our API. 
This has some benefits:
- Creating a more structured and scalable API
- Making it easier to understand and navigate the API
- Making it extensible by grouping related resources, for examples we can have multiple APIs:
> /api/products => for product-related operations
> /api/customers => for customer-related operations
> /api/services => for service-related operations
- Following "RESTful" Convention "/api/employees" => RESTful principles for grouping resources and actions related to those resources

In such case, we will have:
- "/api/employees" [for employee-related operations] is now part of the route
- Using "/employees" as the base route for employee-related operations
- The route in "createEmployeeRoute" which is "/employee" will be mounted under this path
URL (POST) => http://localhost:3000/api/employees
*/

/* 
NOTE TO REVIEW:
***************
For a structured and maintainable Express application, 
using app.use() is a common approach when we want to group similar routes under a common base path, 
like /api/employees. 
In our case, since we are implementing CRUD (Create, Read, Update, Delete) operations for employees, 
it's better to use app.use() for grouping all routes instead of using app.post(), app.get(), app.put(), app.delete() for the specific actions on those routes:

// Routes (for every individual operation):
*******************************************
// POST (Create) - Create a new employee
app.post('/api/employees', createEmployeeRoute);

// GET (Read) - Get all employees
app.get('/api/employees', readEmployeeRoute); // Read all employees

// GET (Read) - Get a specific employee by employee_id
app.get('/api/employees/:employee_id', readEmployeeRoute); // Read employee by employee_id

// PUT (Update) - Update an employee's details by employee_id
app.put('/api/employees/:employee_id', updateEmployeeRoute); // Update employee by employee_id

// DELETE (Delete) - Delete an employee by employee_id
app.delete('/api/employees/:employee_id', deleteEmployeeRoute); // Delete employee by employee_id

While in our example in the code below:
***************************************
app.use('/api/employees', ...): will automatically append /api/employees to the routes we define in each of your CRUD route files. So:
    > createEmployeeRoute: Handles POST for creating an employee.
    > readEmployeeRoute: Handles GET for reading all employees or a specific employee by employee_id.
    > updateEmployeeRoute: Handles PUT for updating an employee.
    > deleteEmployeeRoute: Handles DELETE for removing an employee.

In this approach we define a single base route for employee-related operations (/api/employees),
which makes the code clean and scalable :-)

Link: https://expressjs.com/en/5x/api.html#app.METHOD
Link: https://expressjs.com/en/guide/routing.html
*/

// POST (Create) - Create a New Employee:
// The route is responsible for creating a new employee in the system.
// Route: /api/employees/ 
// URL: http://localhost:3000/api/employees/ (POST request)
// This route handles the creation of a new employee by posting data to the server.
app.use('/api/employees', createEmployeeRoute); // For creating a new employee record


// GET (Read) - Get All Employees:
// The route is used to fetch all employee records from the database.
// Route: /api/employees/
// URL: http://localhost:3000/api/employees/ (GET request)
// This endpoint retrieves a list of all employees in the system.
app.use('/api/employees', readEmployeeRoute); // For reading all employees

// _id = findById() method => notice we didn't implemented this approach, just examine it
// GET (Read) - Get a Specific Employee by ID:
// The route fetches a specific employee based on their unique ID (_id).
// Route: /api/employees/:id
// URL: http://localhost:3000/api/employees/:id (GET request)
// Example: http://localhost:3000/api/employees/12
// This endpoint uses the employee's MongoDB "_id" to query and return a single employee.
// The "findById()" method in MongoDB would be used in this case.
app.use('/api/employees', readEmployeeRoute); // For reading a specific employee _id

// employee_id = findOne() method => the approach we implemented :-)
// GET (Read) - Get a Specific Employee by employee_id:
// This route fetches an employee by their unique "employee_id", 
// Notice that "employee_id" may not necessarily be the MongoDB "_id".
// Route: /api/employees/:employee_id
// URL: http://localhost:3000/api/employees/:employee_id (GET request)
// Example: http://localhost:3000/api/employees/emp123
// This uses the "findOne()" method instead of "findById()" to query the database based on "employee_id".
// The "employee_id" is typically a custom identifier assigned to employees in the system.
app.use('/api/employees', readEmployeeRoute); // For reading a specific employee by employee_id


// PUT (Update) - Update an Employee:
// This route is used to update the details of an existing employee based on their unique "employee_id".
// Notice that "employee_id" is a custom identifier and is different from the MongoDB "_id".
// Route: /api/employees/:employee_id
// URL: http://localhost:3000/api/employees/:employee_id (PUT request)
// The "PUT" request expects the new data for the employee in the request body, 
// and it updates the existing employee record based on the "employee_id" in the URL parameter.
// This allows us to modify an employee's details (such as name, position, etc.) using their custom "employee_id".
app.use('/api/employees', updateEmployeeRoute); // For updating an employee's details by employee_id


// DELETE (Delete) - Delete an Employee:
// This route is used to delete an existing employee based on their unique "employee_id".
// Route: /api/employees/:employee_id
// URL: http://localhost:3000/api/employees/:employee_id (DELETE request)
// The "DELETE" request removes an employee from the database by matching the "employee_id" in the URL.
// Notice that "employee_id" is a custom identifier (not MongoDB's "_id") used to uniquely identify the employee to be deleted.
// After the employee is deleted, the database is updated, and the employee's record is removed from the system.
app.use('/api/employees', deleteEmployeeRoute); // For deleting an employee by employee_id

// URL CREATE (POST), UPDATE (PUT), and DELETE (DELETE), the URL is:
// http://localhost:3000/api/employees/employee/:id

/* 
IMPORTANT NOTE TO REVIEW:
*************************
In this code:
- "route handlers" was imported from separate files (like createEmployeeRoute, readEmployeeRoute, etc.) 
- These route handlers themselves are usually defined using the specific HTTP methods (get(), post(), put(), delete()) for each CRUD operation
- By using app.use(), we are essentially attaching the entire set of routes (route handlers) that we created in every individual file to a common path
- So we are just using app.use() instead of app.get(), app.post(), app.delete(), and app.put()
*/

// Health Check Route:
/* 
// Basic Health Check Example (For testing or debugging purpose) :-)
/* 
This health check route can be used to confirm the server is running correctly:
- A basic response can return a simple string
- Or, it can return a "JSON" object with "status" and "timestamp" for more detailed information
*/
app.get('/', (req, res) => {
    res.send('MongoDB, Express, and Node.js are working!');
});

/* 
FYI:
***
The term "Health Check" or "Health Endpoint" is commonly used in the context of web development,
mainly for APIs and server applications. 
It refers to an endpoint on a server that we can call to verify that the server or application is up and running correctly.

This term is used by Express and many popular platforms:
- Express Health Checks
Link: https://expressjs.com/en/advanced/healthcheck-graceful-shutdown.html

- Microsoft .NET Aspire:
Link: https://learn.microsoft.com/en-us/dotnet/aspire/fundamentals/health-checks

- Kubernetes (Configure Liveness, Readiness and Startup Probes)
Link: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/

- AWS Elastic Beanstalk
Link: https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html
*/

// More Examples of Health Checks:

// Explicit Return in Health Check:
/* 
NOTE:
A health check route could return just a simple string (like in our original code above),
or it could explicitly return a structured response (JSON object) that communicates more information.
For completeness, sending a JSON response instead of just text, 
as it's more common in API development:

Link: https://expressjs.com/en/5x/api.html#res.json
*/

// Health Check with Status (More detailed response with status and timestamp):
/* 
- More advanced version of the health check includes:
    > an explicit HTTP status (200 for OK) 
    > a status and timestamp.
This can be helpful for monitoring and debugging, especially in production environments
*/
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', timestamp: new Date() });
});


// Health Check with Status:
/* 
Explicit Return (more clear and defined):
More advanced example by including HTTP status codes or more detailed information
We explicitly structure the response to convey more details in a clear and intentional way:
- res.status(200) explicitly sets the status code to 200 
    > Returning a status code (200) for "OK" indicating the request was successful
- res.json() sends the response as JSON
    > Returning a JSON object with clear, structured data (status: 'Healthy' and a timestamp).

HTTP response status codes:
Link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
*/
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', timestamp: new Date() });
});

// Define the port (use the one from the environment or default to 3000)
const port = process.env.PORT || 3000;

// Start the Express server: Simple Version or Advanced Version

// Simple Version:
/* 
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 
*/

// Or adding the full structure with error handling:
app.listen(port, () => {
    console.log(`Application URL: http://localhost:${port}`);
}).on('error', (err) => {
    console.error('Server loading error:', err);
    process.exit(1); // Exit with code "1" for errors for any issue
});