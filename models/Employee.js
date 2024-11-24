/* 
In this file, we define our Mongoose schema for the Employee resource
The schema defines the structure of the data that we will store in our MongoDB database
*/

// Import mongoose to define the schema and model
import mongoose from 'mongoose';

/*
Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.
It provides a higher-level abstraction for interacting with MongoDB, 
allowing us to define schemas and models.

Schemas define the structure and validation rules for documents (data) in a MongoDB collection.
Models are constructors compiled from the schema and used to interact with the database.
*/


// Define the schema for an Employee
/* 
The "employeeSchema" defines the structure of an employee document.
Some of the main features in the following schema fields:

- employee_id: 
    > type of String    
    > required field 
    > unique constraint => should be unique

- name:
    > required field + adding a custom message :-)

- job_title:
    > "enum" for adding a predefined set of job titles using array structure (optional)
    [It must be one of the predefined job titles from the "enum" array]

Link: https://mongoosejs.com/docs/schematypes.html
Link: https://mongoosejs.com/docs/validation.html#built-in-validators

Regular expressions (Regex):
Link: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
*/

/* 
Using the Schema constructor "Schema()" provided by Mongoose as part of its mongoose object,
the "new mongoose.Schema()" syntax is the standard and most common way to define a schema:
*/

/* 
IMPORTANT NOTES ABOUT DOCUMENT ID (To Review):
**********************************************
Please notice that MongoDB automatically adds a special "_id" field to each document, 
even if we define our own custom field, such as "employee_id".

Because _id is a special field in MongoDB that is automatically generated for every document, 
and it's used as the unique identifier for the document. 

MongoDB will always uses _id internally as the unique identifier for the document.

We can override the default value of _id:
*****************************************
By explicitly defining our custom primary key/id "employee_id" as "_id" field in the schema itself.
This ensures MongoDB uses that custom field as the primary identifier.

So we still can use a custom field for _id, and MongoDB will treat it as the unique identifier for the document.
With this approach, MongoDB will NOT automatically generate the default ObjectId. 
Instead, it will use your custom _id

Example:
const employeeSchema = new mongoose.Schema({
    _id: { 
        type: String,    
        required: true,   
        unique: true,     
    },

In this case, Mongoose uses your custom "_id" instead of the default ObjectId.


In the example below:
*********************
- We have defined employee_id as a unique identifier in our schema.
- MongoDB still adds the default _id field, 
but it will not be used in our operations unless we specifically access it.
- Since we define employee_id as a unique field and want to use it as the primary key (instead of MongoDB's default _id), 
we need to explicitly handle the request and find by employee_id
*/

// Define the schema for the Employee:
const employeeSchema = new mongoose.Schema({
    /* 
    To recap:
    *********
    This only creates a regular custom field called "employee_id" for the document 
    but does not change the default _id. 
    If we want MongoDB to use "employee_id" as the primary key, we must explicitly define it as "_id"
    */
    employee_id: {
        type: String,
        required: [true, 'Employee ID is required'], // employee_id must be provided
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Employee Name is required'],
        // Optional Validation: name length at least 3 characters:
        minlength: [3, 'Employee Name must be at least 3 characters long'],
    },
    email: {
        type: String,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
        unique: true, // Optional (if email uniqueness is needed)
    },
    job_title: {
        type: String,
        required: [true, 'Job title is required'],
        // Optional:  Enum to ensure the title is within these listed values:
        enum: ['Software Developer', 'Product Manager', 'Graphic Designer', 'HR'],
    },
    age: {
        type: Number,
        // just simple validation without adding a custom message (we should):
        required: true,
        // or with descriptive custom message:
        // required: [true, 'Age is required'],
        // age validation1 (Important): is greater than or equal to 19:
        min: [19, 'Employees age must be at least 18 or above'],
        // age validation2 (Optional): is within a reasonable range:
        max: [120, 'Employee age must be below 120!'],
    },
    date_hired: {
        type: Date,
        // again, just simple validation without adding a custom message (we should):
        required: true,
    },
});

/* 
A Mongoose model => mongoose.model()
- a constructor function that allows us to interact with a specific MongoDB collection
- Is used to define "Models"
- The model gives us access to various methods (save, find, findById, etc.) to interact with the MongoDB database.

In this example, we define the model 'Employee' using the schema 'employeeSchema':
*/

// Create the Model (with the standard collection name behavior => employees):
const Employee = mongoose.model('Employee', employeeSchema);
/* 
To review:
**********
In MongoDB, collections are like tables in SQL. 
By default, Mongoose will use the plural form of the model name 
as the collection name. 
Since our model is called "Employee",

Mongoose will:
- automatically look for a collection called "employees" in the MongoDB database
- handle collection naming based on the model name (Employee => employees)

- Model name: Employee
- Collection name: employees (automatically pluralized by Mongoose)

In case we need to use different name:
const Employee = mongoose.model('Employee', employeeSchema, 'abc-employees');
*/

// Export the Employee model so that it can be used in other files (in routes/controllers)
export default Employee;
/* 
To review:
- using ES6 import/export syntax, which is supported in recent Node.js versions 
with type: "module" in package.json
- the keyword "default" so we can import it with any variable name we prefer
*/


/* 
A NOTE TO CONSIDER: :-)
*******************

If we use the following code for importing "Schema"
We can just use new Schema()

// This would be a more explicit example:
import { Schema } from 'mongoose';
const schema = new Schema({
    name: String,
});
*/

/* 
Regular expressions (regex):
Basic concepts of regular expressions (such as matching characters, wildcards, quantifiers, and anchors) 
are generally consistent across programming languages, examples:
> \S matches any non-whitespace character
> \d (matches a digit)
> \w (matches a word character)
> + (matches one or more of the preceding element)
> ^ (matches the start of a string)
> $ (matches the end of a string)

In JavaScript, regex patterns are usually written between forward slashes:
const regex = /\d+/;

In this example we used the pattern: /\S+@\S+\.\S+/
\S+ => Matches one or more non-whitespace characters
NOTE:
Using \S will match exactly one non-whitespace character (Any single character but not white space)
@: => Matches the @ symbol exactly, which is required in every email address
\S+ => Matches one or more non-whitespace characters after the @, 
representing the domain part of the email address.
\. => Matches the literal dot (.) symbol. 
NOTE:
In regular expressions, a period . is a special character that matches any character, so we escape it with a backslash (\.) to match a literal dot.
\S+ => Matches one or more non-whitespace characters after the dot. 
This part represents the domain extension (.com, .org).

Regular Expression Summary:
    > \S: Matches any non-whitespace character (letters, numbers, punctuation, etc.).
    > \s: Matches whitespace characters (spaces, tabs, newlines, etc.).

\S in Context of Other Patterns:
    > \S+: Matches one or more non-whitespace characters.
    > \S*: Matches zero or more non-whitespace characters (including an empty string).
*/