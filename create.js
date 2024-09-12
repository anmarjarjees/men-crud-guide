/* 
CREATE EMPLOYEE:
****************
Notice that we are focusing on Mongoose (MongoDB) with Node only
*/

// STEP#1: Importing the required modules: 
// Import the mongoose module
import mongoose from 'mongoose';

/* 
CommonJS:
const mongoose = require('mongoose');
*/

// Import dotenv to load environment variables
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// STEP#2: Retrieve MongoDB URI from environment variables
// Using dotenv, the MongoDB URI is securely loaded from an .env file
const mongoURI = process.env.MONGO_URI;

// STEP#3: MongoDB connection using async/await:
// MongoDB connection using async/await based on Mongoose documentation
// either:
/*
async function main() {
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB Atlas');
}
*/

// or:

// MongoDB connection using async/await
async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB Atlas');

        /* 
        Schema Definition:
        ******************
        In Mongoose, everything is derived from a "Schema"

        The "employeeSchema" defines the structure of the Employee documents. 
        Fields like:
        - employee_id
        - name
        - email
        - position
        - age
        - date_hired 
        are all specified with their data types
        Link: https://mongoosejs.com/docs/guide.html#definition
        */
        // Define the schema for an Employee
        // STEP#3: Define the Employee Schema
        /* 
        To review:
        **********
        > "Table" in SQL <=> "Collection" in MongoDB
        > "Record" in SQL <=> "Document" in MongoDB
        
        We need to define the structure of the employee document. 
        This will tell MongoDB how the data should be stored for employees.
        */

        // Define a Mongoose schema for the employee:        
        const employeeSchema = new mongoose.Schema({
            /* 
            Data type is "String" for the "employee_id"
            When adding additional options like required, you need to use the object form:
            */
            employee_id: { type: String, required: true },
            name: { type: String, required: true },
            email: String, // String is shorthand for {type: String}
            position: { type: String, required: true },
            age: { type: Number, required: true },
            date_hired: { type: Date, required: true }
        });

        // Optional Step for demo: Add a custom method to the schema
        // Mongoose NOTE: methods must be added to the schema before compiling it with mongoose.model()
        employeeSchema.methods.getIntroduction = function getIntroduction() {
            const introduction = this.name
                ? `Hello, my name is ${this.name} and I am an ${this.position}`
                : 'I don’t have a name';
            console.log(introduction);
        };

        /* 
        Model Creation:
        ***************
        Compile schema into a "model":
        - It is "class" for constructing document (compiled by Schema)
        - An instance of a model is called a document
        - For creating and reading documents from the underlying MongoDB database.
    
        Link: https://mongoosejs.com/docs/models.html
    
        Below: The schema is compiled into a Employee model using mongoose.model():
        */
        // Create a Mongoose model from the schema
        const Employee = mongoose.model('Employee', employeeSchema);

        /* 
        NOTE:
        Since the model is named Employee, 
        Mongoose will look for a collection called employees in the database

        we can also "explicitly" define the collection name (optional):
        const Employee = mongoose.model('Employee', employeeSchema, 'employees');
        */

        // Document Creation: Create a new employee document
        const employee = new Employee({
            employee_id: 'emp123',
            name: 'Alex Chow',
            email: 'alex@college.com',
            position: 'Instructor',
            age: 58,
            date_hired: new Date('2024-07-03')
        });

        // Call the custom method defined in the schema
        employee.getIntroduction(); // Logs: Hello, my name is Alex Chow and I am an Instructor

        /* 
        Saving to Database:
        *******************
        Each document can be saved to the database by calling its "save()" method:
        */
        // Save the employee document to MongoDB
        // Either:
        // await employee.save();
        console.log('Employee saved to the database.');

        // OR:
        /*  
        NOTE:
        To double-check the save operation:
        You can "explicitly" log the result of the save operation to see if it succeeded:
        */
        await employee.save().then((doc) => {
            console.log('Employee saved:', doc);
        }).catch((err) => {
            console.error('Save failed:', err);
        });

    } // try {}
    // Error Handling:
    catch (err) {
        console.error('Error occurred:', err);
    }
} // main()

// Connect to the MongoDB database and handle any errors
main().catch(err => console.log('MongoDB connection error:', err));