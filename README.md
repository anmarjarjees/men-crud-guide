# MangoDB Express Node.js CRUD Guide (men-crud-guide):
Quick demo for CRUD operations using MongoDB, Express, and Node.js with Mongoose which is the the Object Data Modeling (ODM) library for MongoDB and Node.js.

To review, MongoDB is a NoSQL database that stores data in flexible, JSON-like documents (BSON). Mongoose acts as a layer on top of MongoDB to provide a more structured approach to interacting with the database.

In this application, Express acts as the server framework, while MongoDB is the database, and Node.js is the runtime environment. Mongoose for interacting with MongoDB on the backend (Node.js/Express). 

# Database Interaction:
We have two different techniques for interacting with databases:
- **ORM (Object-Relational Mapping)**
  - Allows us to interact with relational databases (like MySQL or PostgreSQL) using programming languages, instead of writing raw SQL queries.
  - Example: Used with frameworks like ASP.NET (via Entity Framework) and Django (via Django ORM).
  - You can check some of my other repos for .NET Development:
    - https://github.com/anmarjarjees/csharp-essentials
    - https://github.com/anmarjarjees/entity-framework-intro/tree/main/EFGetStarted
    - https://github.com/anmarjarjees/ASPCoreDB
    - https://github.com/anmarjarjees/CoolCrafts
    - https://github.com/anmarjarjees/MovieMVC
  - You can check my two repos about Django:
    - https://github.com/anmarjarjees/start-ci-django
    - https://github.com/anmarjarjees/django-framework
- **ODM (Object-Document Mapping)**
  - Allows us to interact with NoSQL databases (like MongoDB) using a flexible format called documents (often in JSON or BSON).
  - Example: Used with MongoDB and frameworks like Mongoose (for Node.js) and MongoEngine (for Python).

# Popular Web Development Stacks:
The most popular web development stacks today, especially for building full-stack web applications:
- MERN:
  - MongoDB (Database)
  - Express (Backend Framework)
  - React (Frontend Library)
  - Node.js (Runtime Environment)
- MEVN:
  - V for **"Vue"**
- MEAN
  - A for **"Angular"**


**Topics covered in this repo:**

1- CRUD operations (Create, Read, Update, Delete):
  - Using POST, GET, PUT, DELETE HTTP methods with Express.
  - Interacting with MongoDB using Mongoose models.
  - Ensuring data validation and schema design based on Mongoose's latest features.

2- Async/Await and Error Handling:
  - Following async/await conventions to work with MongoDB operations asynchronously.
  - Using try/catch blocks for error handling.

3- Middleware and Validation:
  - Express middleware for parsing JSON bodies and handling errors.
  - Mongoose validation techniques for incoming data.

4- Deployment (Heroku or other platforms) in needed:
  - Deploying our project while ensuring all environment variables and MongoDB connections are properly configured in the deployment environment.

**Major Milestones for our application:**

1- Create Mongoose Models (already covered)
  - Define schemas and models for our data.
    
2- Implement CRUD Operations
  Create: Add new documents to our MongoDB collections.
  Read: Retrieve documents from our MongoDB collections.
  Update: Modify existing documents in MongoDB.
  Delete: Remove documents from MongoDB collections.

3- Connect Routes to CRUD Operations
  - Create API endpoints in Express to handle each CRUD operation using the Mongoose model

4- Test CRUD Operations
  - Use tools like Postman or cURL to test our API endpoints

Practicing CRUD operations with just the MongoDB (M), Express (E), and Node.js (N) for building a solid foundation before integrating Vue.js, Angular.js, or React.js.

### 1. Focus on Backend First (MongoDB, Express, Node.js)
Understanding the core of backend development and database operations before introducing the complexities of frontend frameworks. By practicing CRUD operations purely with Node.js, Express, and MongoDB, you'll build a strong foundation in:

- Setting up and connecting to MongoDB (using Mongoose)
- Creating RESTful API routes with Express
- Handling HTTP methods (GET, POST, PUT, DELETE) to interact with MongoDB
- Working with asynchronous code (async/await)
- Handling environment variables securely (ex: MongoDB URI)

We will have a working API (backend) to connect to and retrieve or send data.

# Step 1: Setting up the Project
Before coding, here's a quick overview of what we'll do:
- Set up the Node.js and Express app (This is already done in our code).
- Connect to MongoDB Atlas (we've already handled this in our code as well).
- Create a MongoDB model that we can use to interact with our database.
- Set up the CRUD routes (Create, Read, Update, Delete) in separate files

**Folder Structure:**
```
MEN-CRUD-GUIDE/
│
├── models/           // Mongoose models
│   └── Employee.js   // The Mongoose model for our Employee
│
├── routes/           // Route definitions 
│   ├── createEmployee.js    // Create route
│   ├── readEmployee.js      // Read route
│   ├── updateEmployee.js    // Update route
│   └── deleteEmployee.js    // Delete route
│
├── .env               // Environment variables (Mongo URI, etc.)
├── app.js             // Main Express app -Entry point for our application
└── package.json       // Dependencies and project metadata
```

The folder structure is simple for a basic Express app using MongoDB (MEN stack) as it follows a widely-used, common convention for Node.js apps, especially when working with a CRUD application:

  **1. Separation of concerns:** We've separated the concerns well, with different folders for:

      - models: Keeping the Mongoose models isolated
      - routes: Organizing our route definitions by functionality (create, read, update, delete)
      - .env: Storing environment variables securely
      - app.js: The main entry point where we initialize our Express server and middleware

  **2. Simplicity:** Since we're building a CRUD app, keeping everything neat and organized without too many nested layers is a good approach

Notice that it's also common to group related routes into a single file, especially for the same resource. For example:
> routes/employee.js: Contains routes for creating, reading, updating, and deleting employees.
```
│
├── routes/            // Route definitions
│   └── employee.js    // All employee routes (CRUD)
```
** Folder Structure Quick Breakdown:**
- models/: Contains the Mongoose models (ex: Employee.js). This is great for data structure definition and separation of concerns.
- routes/: Each file handles a specific operation (CRUD) for the employee resource. This makes it modular and easy to maintain.
- .env: Used for storing sensitive or environment-specific variables (like MONGO_URI).
- app.js: The main entry point for the app. This is where you configure routes, the database connection, and middleware.

**HINT and Tips :-)**
To draw these symbols ┼, ├, └, ─, we can use "ALT Codes" in Windows:
- │ (Vertical line):
  - Press Alt + 179 (on the numeric keypad) to get │
- ├── (Branch symbol):
  - First press Alt + 195 for ├ and then ── using the hyphen key -
- └── (End branch symbol):
  - Same, Alt + 192 for └ then ── using the hyphen key -
- ─ (Horizontal dash):
  - Press Alt + 196 to get the long horizontal dash ─

## Quick Review for initializing our project and installing the required packages:
For more details please refer to my repo ["MEN Starter Kit"](https://github.com/anmarjarjees/men-starter-kit):

1) Initiate the package.json file:
    ```
    npm init
    ```

or:
      ```
      npm init -y
      ```

2) Set Up Express and Mongoose:
    ```
    npm install express mongoose
    ```

3) Installing nodemon for development mode:
    ```
    npm install nodemon --save-dev  
    ```

4) Creating the server JavaScript file: server, app, or index by convention

5) Modify the package.json according to what we did previously

6) Set Up MongoDB (Please refer to my lecture comprehensive PDF files)

7) Create the .env File: ".env" 

Notice for more details about the initial setup and connection,
review my repo "MEN Starter Kit" :
Link: https://github.com/anmarjarjees/men-starter-kit

# Step 2: Model Setup (Employee.js)
This step involves creating a Mongoose model that defines the structure of our data in MongoDB. The model will allow us to interact with the Employee collection.

  > File: models/Employee.js

# Step 3: Create Operation (createEmployee.js)
Next, we'll set up the Create operation for adding new employee to the MongoDB database.

  > File: routes/createEmployee.js

# Step 4: Setting up Express Routes in app.js
Update our main app.js to incorporate these routes. We will import and use the route for the Create operation.
  > File: app.js

# Step 5: Testing the Create Route
As we discussed and practiced before with Express, an API tool is needed because browsers typically can only handle GET requests by default. A tool like **"Postman"** allows us to test all HTTP methods (like POST, PUT, DELETE) easily.

To test and interact with the CREATE, UPDATE, and DELETE operations in our Express + MongoDB application for the time being, we need an API tool like "Postman".

Postman acts as a client to simulate requests to our server to test the back-end and CRUD operations even before setting up any front-end (like React, Vue, or Angular). 

Remember as we discussed before that without a tool like Postman, we can't directly interact with the server or send HTTP requests to test CRUD [Create, Update, and Delete] operations, only Read with get() method.

Start the server by running node app.js.
Use Postman or Insomnia to send a POST request to http://localhost:3000/employee 


```json
{
  "employee_id": "emp001",
  "name": "Martin Smith",
  "email": "m.smith@mongo-to-go.com",
  "position": "General Director",
  "age": 49,
  "date_hired": "2023-11-01"
}
```

**Notice that we can either use Postman Desktop version or Postman VS Code extension**

# Code Files Working Order:
1. app.js (Main Entry Point)
2. .env file
3. Employees.js
4. createEmployee.js: Create with put()
5. readEmployee.js: Read with get()
6. updateEmployee.js: Update with put()
7. deleteEmployee.js: Delete with delete()

### Steps for running and testing:
In these steps,I am using the ["Postman" VScode extension](https://marketplace.visualstudio.com/items?itemName=Postman.postman-for-vscode) as one of the most common and proper ways to add/update/delete data to/data database vis an API in this repo for development and testing purposes. With a full application, we should use frontend form (User Interface).

1. Run the app with any way that I explained to you before.
2. Open Postman VS code Extension
3. You can just create a new request by clicking "New HTTP Request" button:
!["Postman Main Navigation Bar"](./img-repo/postman-main-nav.png)
4. Within Postman main dashboard:
  - Method: "POST"
  - URL: http://localhost:3000/api/employees (the URL for your create employee route)
  - Set up the Request Body:
    - go to the Body tab and select **"raw"** and **"JSON"** format from the dropdown menu
    !["Postman Initial POST setup"](./img-repo/postman-initial-post-setup.png)
    - Input the employee data you want to send in the following format:
    ```json
      {
        "employee_id": "emp557",
        "name": "Martin Smith",
        "email": "m.smith@men-demo.com",
        "job_title": "Software Developer",
        "age": 50,
        "date_hired": "2022-10-08"
      }
    ```
    !["Postman POST JSON Format"](./img-repo/postman-post-json-format.png)
  - Click "Send", and you should get a 201 Created status code in the response
  !["Postman POST Status Code 201"](./img-repo/postman-post-status-code201.png)
  You should also see the result (duo to some extension issue, you need to click other option to activate it), so you can click either one of these buttons: Pretty, Raw, Review also:
  ![Postman Post Preview](./img-repo/postman-post-preview.png)


# References, Resources, and Credits:
- My Repositories and their listed resources in ReadMe files. Repos are sorted according to their logical order from **A (pre-requisites) to Z (Final Stage)**:
  1. Introduction to "ECMAScript":
      - https://github.com/anmarjarjees/ECMAScript6
  2. Starting with learning Node.js:
      - https://github.com/anmarjarjees/node.js-start
  3. Express Basic:
      - https://github.com/anmarjarjees/express-basics
  4. Express and Node Website Implementation:
      - https://github.com/anmarjarjees/express-node-website
  5. Express Website with HBS (Optional) 
      - https://github.com/anmarjarjees/express-website-hbs
  6. Learning about MQL (MongoDB Query Language):
      - https://github.com/anmarjarjees/mongodb-vscode
  7. Implementing CRUD operation with pure node.js and MongoDB (No Mongoose) 
      - https://github.com/anmarjarjees/node.js-mongodb
  8. The starter boilerplate setup using MongoDB, Express, and Node.js (MEN)
      - https://github.com/anmarjarjees/men-starter-kit

- [Express web framework (Node.js/JavaScript)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)

- [Node.js body parsing middleware](https://expressjs.com/en/resources/middleware/body-parser.html)

- [Express Middleware](https://expressjs.com/en/guide/using-middleware.html)

- [dotenv (Environment Variables)](https://www.npmjs.com/package/dotenv)

- [Environment Variables with dotenv GitHub Repository](https://github.com/motdotla/dotenv)

- [MongoDB Developer Platform](https://www.mongodb.com/developer/)

- [Mongoose - Getting Started](https://mongoosejs.com/docs/index.html)

- [MongoDB URI Format (MongoDB Atlas Connection URI)](https://www.mongodb.com/docs/atlas/connect-to-database-deployment/)

- [Getting Started With MongoDB & Mongoose Article](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)

- [NPM CORS](https://www.npmjs.com/package/cors)

- [Learning Postman Documents](https://learning.postman.com/docs/getting-started/basics/about-vs-code-extension/)

- [Getting Started with MongoDB & Mongoose ODM (Object Data Modeling) Library](https://youtu.be/bALyYC10ABw?si=XrOdIEsVpYIek8st)

- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

- [Regular expressions (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

- [Regex101](https://regex101.com/)

- [Validator.js](https://github.com/validatorjs/validator.js)

- [ALT Key Codes](https://www.alt-codes.net/)