/*  
DELETE route for deleting an employee from the database.
This route handles DELETE requests to remove an employee by their ID.
*/

// Import express and the Employee model
import express from 'express';
import Employee from '../models/Employee.js';

// Create an Express Router instance (this helps keep our routes organized)
const router = express.Router();

/* 
Link: https://expressjs.com/en/guide/routing.html#express-router
*/

// DELETE route to remove an employee by ID
/* 
NOTE:
The ':employee_id' in the route refers to a dynamic parameter,
this parameter will represent the employee's primary key/field "employee_id"

We can also use ':id' in the route refers to a dynamic parameter,
But only depends on our Schema
*/
/* DELETE route to remove an employee by employee_id */
router.delete('/:employee_id', async (req, res) => {
    try {
        // Extract the employee ID from the request parameters
        /* 
        To review:
        *********
        - Remember, when using dynamic routes with parameters (like ':id'), 
        we can access the parameter using:
        - const id = req.params.id
        OR: 
        */
        // code below only works if we have considered "_id" as the primary key/field
        // const { id } = req.params;
        // const deletedEmployee = await Employee.findByIdAndDelete(id);
        // Link: https://mongoosejs.com/docs/api/model.html#Model.findByIdAndDelete()

        // Extract the employee ID from the request parameters
        const { employee_id } = req.params;

        // Attempt to find and delete the employee with the given ID
        // Mongoose's findByIdAndDelete() method deletes the employee if found
        // Attempt to find and delete the employee with the given employee_id
        const deletedEmployee = await Employee.findOneAndDelete({ employee_id });
        /* 
        Link: https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
        */

        // If the employee is not found, respond with a 404 error and a message
        if (!deletedEmployee) {
            return res.status(404).json({ message: `Employee with employee_id ${employee_id} not found` });
            // return res.status(404).json({ message: `Employee with ID ${id} not found` });
        }

        // If the employee was successfully deleted, return a success message:
        res.status(200).json({ message: `Employee with employee_id ${employee_id} deleted successfully` });
        // res.status(200).json({ message: `Employee with ID ${id} deleted successfully` });
    } catch (error) {
        // If an error occurs (like: invalid ID format, database issue), return a 400 error
        res.status(400).json({ message: error.message });
    }
});

// Export the router so it can be used in the main app file (app.js)
export default router;

/*
Key Points:
***********
- This route uses the Express Router to handle DELETE requests to the "/employee/:id" URL.
- The ':id' is a dynamic URL parameter that represents the unique ID of the employee we want to delete.
- We use Mongoose method "findByIdAndDelete()" to find and delete the employee document in one step.
- If the employee with the specified ID is not found, the server responds with a 404 status and a message saying the employee was not found.
- If the deletion is successful, the server responds with a 200 status and a success message.
- The error handling ensures that any issues (like an invalid ID format or database errors) are caught and a 400 status is returned with the error message.
*/
