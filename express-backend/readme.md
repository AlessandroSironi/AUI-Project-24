## Backend structure

### index.ts

This is the entry point of the backend, it is used to setup the environment and "collect all the routes".
When a new routes file is added to the project it must be imported in the index and used accordingly.

### routes

This folder will contain a file for each request associated to a related topic (For example the appliances will have a single file with the GET, POST... requests related to them).
Each route is paired to a controller in the controllers folder.

### controllers

This folder includes the specific functions called when a request is received, the functions can access the database and perform tasks, sending the results to the user in the end.

### middleware

This folder is used to store all the logic that occurs before the route calls its controller, an example of middleware we use is the one that handles authentication

## Installation guide

1. please check if node is installed on your machine.
2. when in the _express-backend_ folder type `npm i`.
