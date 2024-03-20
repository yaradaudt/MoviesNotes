MAIN VERBS FOR REQUIREMENT ON NODE

GET - Reading -> to get some readable info

POST - Creating 

PUT - Adjustments 

DELETE - Self-explaining

PATCH -> To parcially adjust 


EXPECTED PATTERN 

When using controllers, you get to determine a max of 5 functions to it. They are:

*index - GET to list several records.
*show - GET to exibit a specific record.
*create - POST to create a new rec.
*update - PUT to update 
*delete - DELETE to remove records.

In case you need to add more than 5, it's best if you just create a new controller, to divide responsabilities.


Middleware

Function that can access both the request&response objects and the next function on the request-response app's cicle.

What can a Middleware do:

*Execute any code;
*Make changes on the request&response objects;
*End a request-response cicle;
*Call next middleware on the pile;

Next -> var middleware function 
Function that makes middleware go to the next function, and so creating a user (in this app case)

Exemple:

function myMiddleware(request, response, next) {
    console.log("Você passou pelo Middleware");
    if(!request.body.isAdmin) {
        return response.json({ message: "user unauthorized"}); // when returning a function, the next action will not run, because it has ended on return.
    };

    next();
}

const usersController = new UsersController();

usersRoutes.use(myMiddleware);
usersRoutes.post("/", usersController.create);
or
usersRoutes.post("/", myMiddleware, usersController.create);
depending on how you want the app to work, and which functions will operate using Middleware.

If the request doesn't come from an authenthicated place (isAdmin = false, in this case), the app will end the function returning the mentioned text.

If it comes from isAdmin=true, then it will go on and access the next function: authorized creation function. 


SQL - Structured Query Language.
Default Language to relational database.

Commands: 

DDL - Data Definition Language
  CREATE, DROP(delete), ALTER, RENAME

DML - Data Manipulation Language
C - Create - INSERT
R - Read - SELECT
U - Update - UPDATE
D - Delete - DELETE


NPM vs NPX

NPM - Node Package Manager
Default node package manager
Needed packages and modules in a node project are installed using npm
It's also used to execute installed scripts and libraries.

NPX - Node Package Execute
It comes with npm from the 5.1 version on
Package executer in which it's possible to execute any wanted npm package from register, without the need to install this forementioned package. (advantage) 

How to install npm, express knex and what are they for

npm init -y -> first things first (creates package.json)

npm install express --save (creates node modules and package-lock.json)

npm install express-async-errors
(to work with async)

node src/server.js (to run on server) (it's also possible to make a new command, so you can address it and "npm start" is enough)

npm install nodemon --save-dev (this way you don't need to start the server every and each time a change happens. It keeps everything on the determined Port)

npm run dev (to run on server. Here, for this command to be made, it has to be added to the script on package.json, with the source being the server.js)

npm install bcryptjs

npm install sqlite3 sqlite --save (connects to database)

npm install knex --save 

npx knex init (creates the knexfile.js)
edit the file and set accordingly as you want it. When exporting, the development session is where you put the client and the connection, so the db files are created.

npx knex migrate:make createNotes (create the file with the name you want, rulled by the knexfile)



Commands for terminal