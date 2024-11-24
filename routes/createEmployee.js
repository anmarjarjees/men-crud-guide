/* 
POST route for adding a new Employee to the database.
This route will handle POST requests to create a new employee document in MongoDB.
*/

// Import express and the Employee model
import express from 'express';

// Import Employee model (Mongoose model defined in models/Employee.js)
import Employee from '../models/Employee.js';

// Routing with Express: 
/* 
Create an Express Router instance using express.Router() for defining routes in a separate module
Express provides a Router that allows us to define routes and group them in a modular way
*/

const router = express.Router();
/* 
Link: https://expressjs.com/en/guide/routing.html#express-router
*/

// POST route for creating a new employee (Notes and Details):
/* 
NOTE:
*****
- RESTful API principles - POST requests are used for creating a resource (like an employee)
- The resource collection should be represented by the URL (ex: /api/employees).
- The '/' route will handle POST requests to create a new employee
- Using '/employee' is not recommended! It could suggest we are trying to work with a single employee resource (specific employee)

When we send a POST request to '/', this route:
- extracts the data from the request body
- creates a new employee document using Mongoose
- saves it to the MongoDB database

POST Endpoint:
The POST route "/" extracts the data from the request body, 
creates a new employee document, and saves it to MongoDB

NOTES and TIPS to Consider :-)
*****************************
Using this approach => router.post('/', async (req, res)
It's more recommended than using this approach => router.post('/employee', async (req, res)
For these two main reasons:
1. RESTful Design Principles:
    - In a RESTful API, the endpoint for creating a resource (like an employee) 
    should be the collection of that resource (ex: /api/employees), not an individual resource
    - "POST" is used to create a new employee within the employees collection

2. Consistency and Scalability:
    - We can use the same pattern to add more functionality like /api/products
    - The /api/employees/ URL should be used for actions related to employees 
    (creating, updating, deleting), which keeps it clean and RESTful
3. Clarity:
    - /api/employees/ is self-explanatory which is the endpoint for interacting with employees
    - /api/employees/employee could be confusing!
     as it suggests you're working with a specific employee 
     (which typically would be handled with a parameterized route like /api/employees/:id for individual employee actions like GET, PUT, or DELETE)
*/
// POST route for creating a new employee:
router.post('/', async (req, res) => {
    try {
        // just for testing:
        // Logs the incoming data to check if it's correct
        console.log(req.body);

        // Extracting Request Data:
        /*
        Extract data from the request body:
        req.body will contain the data sent by the client (POST request with JSON data)
        
        Using "destructuring" to get specific properties from req.body, 
        such as employee_id, name, email, etc.

        Link: https://expressjs.com/en/5x/api.html#req.body
         */
        // Extracting data from the request body
        const { employee_id, name, email, job_title, age, date_hired } = req.body;

        // Validate that all required fields are present [Extra Optional & Advanced Step]:
        // Ensuring that the client has provided all necessary data for creating an employee
        if (!employee_id || !name || !email || !job_title || !age || !date_hired) {
            /*
            NOTE:
            The client must provide all required data for creating an employee, 
            otherwise, it's not valid!
            If any required field is missing, 
            we return a 400 status (Bad Request) with a helpful error message.
          
            Link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400
            */
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create a new employee document
        // The Employee model is used here to create a new instance with the extracted data.
        /* 
        Remember that "Employee" model corresponds to a collection in MongoDB 
        where employee documents are stored.

        So this new instance "newEmployee" 
        will become a document in the MongoDB collection called 'employees'.
        */
        const newEmployee = new Employee({
            employee_id,
            name,
            email,
            job_title,
            age,
            date_hired,
        });

        // Save the new employee to the database
        // newEmployee.save() is an async operation that saves the employee to MongoDB.
        /* 
        Saving the document is an asynchronous operation (returns a Promise). 
        - save() method returns a Promise:
            > Which means, it will complete asynchronously (in the future)
            > so we have to use "await" to wait for the save operation to complete
        before moving on to the next line of code.
        
        Notice that without "await", 
        the "savedEmployee" below would contain the unresolved Promise itself, 
        which would not give us the actual saved employee data.
        */

        // Save the new employee to the database
        const savedEmployee = await newEmployee.save();
        /* 
        To recap => save():
        - It's Mongoose's method
        - It's an asynchronous operation
        - It returns a Promise that resolves 
        when the employee document has been successfully saved to the MongoDB database
        */

        // Return the saved employee data in the response
        // After successfully saving, we respond with the saved employee data
        // We also send a 201 HTTP status code (Created) as a successful creation response
        // Return the saved employee data with a 201 status
        res.status(201).json(savedEmployee);
        /* 
        res.status(201) => Setting the HTTP status code to 201:
        > Indicating that the request has been fulfilled and a new resource has been created
        > 201 Created status indicates that a resource was successfully created
        > It's the standard success code used for successful POST requests that result in new resources
        Link: https://expressjs.com/en/5x/api.html#res.status
        Link: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/201
        */
    } catch (error) {
        /* 
        Handle any errors during the creation process, common errors:
        - Invalid data format (ex: wrong data type for a field)
        - MongoDB connection errors
        - Missing required fields (this is handled earlier in the code)
        */
        // If there is an error (like: invalid data, MongoDB issues), we catch the error here
        // Sending or returning a 400 status code (Bad Request) and include the error message in the response.
        res.status(400).json({ message: error.message });
    }
});

// ES6 module "export": To export the router so it can be used in the main app
export default router;
// export router;

/* 
IMPORTANT NOTE TO REVIEW:
- export default router;
    > Exporting the variable "router" as default
    > In another file, we can import it using any name we want:
    
    Code Example:
    // export default router; allows us to import it with any name:
    import createEmployeeRoute from './createEmployee.js';  // Flexible naming

- export router;
    > Exporting the variable "router" as "router" (the same)
    > In another file, you must use the exact same name:

    Code Example:
    // export router; forces us to use the exact same name:
    import { router } from './createEmployee.js';  // Name must match the export name

To summarize:
- export default: We can import using any name we want
- export (named export): We must import using the exact same name
*/