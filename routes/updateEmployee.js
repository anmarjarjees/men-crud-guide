/*  
PUT route for updating an existing employee in the database.
This route will handle PUT requests to update an employee's information.
*/

// Import express and the Employee model
import express from 'express';
import Employee from '../models/Employee.js';

// Create an Express Router instance
const router = express.Router();

/* 
Link: https://expressjs.com/en/guide/routing.html#express-router
*/

// PUT route for updating an existing employee by employee_id
router.put('/:employee_id', async (req, res) => {
    try {
        // Extract the employee ID from the request params
        /* 
        To review:
        *********
        - Remember, when using dynamic routes with parameters (like ':id'), 
        we can access the parameter using:
        - const id = req.params.id
        OR: 
        */
        // const { id } = req.params;

        // remember that we are using employee_id instead of _id :-)
        const { employee_id } = req.params;

        // Extract the updated employee data from the request body
        // Notice we skipped the "employee_id" as it will embedded to the URL
        const { name, email, job_title, age, date_hired } = req.body;

        // Validate that all required fields are provided (optional, can be customized)
        if (!name || !email || !job_title || !age || !date_hired) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Find the employee by ID and update it with the new data
        /*
        The "findByIdAndUpdate" method is used to update an existing document by its ID
        Link: https://mongoosejs.com/docs/api/model.html#Model.findByIdAndUpdate()
        Link: https://mongoosejs.com/docs/tutorials/findoneandupdate.html
        */

        /*
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            ...etc...
        */

        // Find the employee by employee_id and update it with the new data
        // Link: https://www.mongodb.com/docs/manual/reference/method/db.collection.findOneAndUpdate/
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employee_id },  // "Query Object" to find the employee based on employee_id
            {
                name,
                email,
                job_title,
                age,
                date_hired,
            },
            { new: true }  // Option to return the updated document, not the old one
        );
        /* 
        Option: new
        - If set to true, it will return the modified document rather than the original. 
        The default is false. B default, Mongoose returns the document before the update was applied!
        So we should set the new option to true to return the document after update was applied:
        { new: true }
        */

        // If the employee is not found, return a 404 status
        if (!updatedEmployee) {
            // return res.status(404).json({ message: `Employee with ID ${id} not found` });
            return res.status(404).json({ message: `Employee with employee_id ${employee_id} not found` });
        }

        // Return the updated employee data in the response
        res.status(200).json(updatedEmployee);
    } catch (error) {
        // Handle any errors during the update process
        res.status(400).json({ message: error.message });
    }
});

// Export the router so it can be used in the main app
export default router;

/*
IMPORTANT NOTES FOR REVIEW:
- This route uses the PUT method to update an existing employee by ID.
- The route is "/employee/:id", where ":id" is a dynamic parameter representing the employee's ID.
- We use "findByIdAndUpdate" to search for the employee by ID and update it with the provided data.
- The "{ new: true }" option ensures that the updated document is returned rather than the original one.
- This operation assumes that the ID exists in the database; if not, it returns a 404 error.
*/