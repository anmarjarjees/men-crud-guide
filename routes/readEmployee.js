/*  
GET route for reading employees from the database.
This route will handle GET requests to read employee(s) from the database.
*/

// Import express and the Employee model
import express from 'express';
import Employee from '../models/Employee.js';

// Create an Express Router instance
const router = express.Router();
/* 
Link: https://expressjs.com/en/guide/routing.html#express-router
*/

// "GET" route for fetching all employees
router.get('/', async (req, res) => {
    try {
        // Fetch all employees from the database
        // The find() method returns all documents from the Employee collection in MongoDB
        const employees = await Employee.find(); // Mongoose method "find()" returns all employees

        // If no employees are found, return a 404 status with a message
        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        // Respond with the list of employees in JSON format
        // The response will have a status code of 200 (OK) and the list of employees
        res.status(200).json(employees);
    } catch (error) {
        // Handle any errors that might occur during the fetching process
        // If an error occurs (like: MongoDB issue, or query failure), return a 400 status
        res.status(400).json({ message: error.message });
    }
});

/* 
Optional Coding: 
****************
Add filtering based on query params (like job_title, age)
(Adding optional query filtering can increase flexibility):

Code Snippet:
*************
    const { job_title, age } = req.query;
    let query = {};

    if (job_title) {
        query.job_title = job_title;
    }
    if (age) {
        query.age = age;
    }

    // Fetch all employees from the database or based on query filters
    const employees = await Employee.find(query);
*/


/* 
IMPORTANT NOTE:
***************
Since we need to use our custom primary field (id) called "employee_id",
the route (endpoint) will be /:employee_id INSTEAD of just /:id
*/
// "GET" route for fetching a specific employee by employee_id
router.get('/:employee_id', async (req, res) => {
    try {
        // Extract the employee ID from the request params
        /*  
        By Default:
        ":id" is a route parameter. 
        It's part of the URL and allows us to dynamically get the employee ID.

        But remember that our id is named "employee_id"
        */
        /* 
        To review:
        *********
        - Remember, when using dynamic routes with parameters (like ':id'), 
        we can access the parameter using:
        - const id = req.params.id
        OR: 
        */
        // const { id } = req.params; // if we explicitly defining "_id" field as the primary key in our schema
        // then we can use the standard method findById():
        // const employee = await Employee.findById(id);

        // Extract the id (Not used in our case)
        // const { id } = req.params;

        // Extract the employee_id from the request params
        const { employee_id } = req.params;

        // Fetch the employee by ID using Mongoose's findById() method
        // const employee = await Employee.findById(id);

        /* 
        since we need to use our custom field (primary key) which is "employee_id",
        we need to use the method findOne() instead of findById():
        */
        const employee = await Employee.findOne({ employee_id });

        // If employee not found, return a 404 status with a custom message
        if (!employee) {
            return res.status(404).json({ message: `Employee with ID ${employee_id} not found` });

            // same logic if we use _id with findById() method:
            // return res.status(404).json({ message: `Employee with ID ${id} not found` });

        }

        // Respond with the employee data
        // The response will include the employee object in JSON format and a status code of 200 (OK)
        res.status(200).json(employee);
    } catch (error) {
        // Handle any errors (like invalid ID format, or MongoDB-related issues)
        // Return a 400 status with the error message in case something goes wrong
        res.status(400).json({ message: error.message });
    }
});

// Export the router so it can be used in the main app
export default router;

/*
IMPORTANT NOTE TO REVIEW:
*************************
We have examined two different approaches to deal with the primary keys in MongoDB that makes our code easier to read and more friendly:

1. Primary Approach:
********************
Use employee_id as a Custom Field
Using a custom field with any descriptive name like (employee_id) for our primary identifier

Main Coding Steps:
------------------
> Define "employee_id" as a unique field in your schema.
> Use findOne() to fetch employees by employee_id

Code Snippet:
-------------
router.get('/:employee_id', async (req, res) => {
    try {
        const { employee_id } = req.params;
        const employee = await Employee.findOne({ employee_id });
        .......
    }

2. Secondary Approach (Optional):
*********************************
Use _id and findById()
Using a custom field with Mongo ID default label (_id) as our primary identifier

Main Coding Steps:
------------------
> Define "_id" in the schema (if we want to override it to use custom types)
> Use findById() to fetch employees by _id

Code Snippet:
-------------
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        .......
    }


About "readEmployee.js" route:
******************************
- This route uses Express Router to handle GET requests to "/employees" (fetch all employees)
  and "/employee/:id" (fetch a single employee by ID).
  
  - The route "/employees" will fetch all employees from the database and return them as an array.
  - The route "/employee/:employee_D" will fetch a specific employee by their unique ID.

- You can add further validation or query parameters for more complex searches.
  For example:
  - You could add query parameters to filter by job title, age, etc.
  - Example: "/employees?job_title=Software Developer"
  
  This can help improve flexibility in your API.

- Common Use Cases:
  - Fetching all employees for an admin dashboard or listing.
  - Fetching a specific employee's details for viewing or editing.
*/