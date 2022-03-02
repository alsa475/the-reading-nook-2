// App.js

/*
    SETUP
*/

PORT        = 35857;                            // Set a port number at the top so it's easy to change in the future
var express = require('express');               // We are using the express library for the web server
var app     = express();                        // We need to instantiate an express object to interact with the server in our code
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
app.use(express.static('views'));


// Database
var db = require('./database/db-connector')

/*
    ROUTES
*/

app.get('/', function(req, res)
    {
        res.render('index');                    // Note the call to render() and not send(). Using render() ensures the templating engine
    });                                         // will process this file, before sending the finished HTML to the client.

/* Customers */    
// Show all customers
app.get('/customers', function(req, res)
    {
        let query1 = "SELECT * FROM Customers;";                // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('customers', {data: rows});              // Render the customers.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// Add new customer page    
app.get('/new_customer', function(req, res)
{
    res.render('new_customer');                   
});                                         

// Add a new customer
app.post('/new-customer-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Customers (first_name, last_name, email, street_address, city, state, zip_code) VALUES ('${data['first_name_input']}', '${data['last_name_input']}', '${data['email_input']}', '${data['street_address_input']}', '${data['city_input']}', '${data['state_input']}', '${data['zip_code_input']}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our Customers page
        else
        {
            let query1 = "SELECT * FROM Customers;";         
            db.pool.query(query1, function(error, rows, fields){    
                res.render('customers', {data: rows});                  
            })     
        }
    })
})

// Edit customer page    
app.get('/edit_customer', function(req, res)
{
    res.render('edit_customer');                   
});                                         


/* Books */ 
// Show all books   
app.get('/books', function(req, res)
    {
        let query1 = "SELECT * FROM Books;";                    // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('books', {data: rows});                  // Render the books.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// Add new book page    
app.get('/new_book', function(req, res)
{
    res.render('new_book');                    
});                                         

// Add a new book
app.post('/new-book-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Books (title, author, genre, price, quantity_in_stock) VALUES ('${data['title_input']}', '${data['author_input']}', '${data['genre_input']}', '${data['price_input']}', '${data['quantity_in_stock_input']}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our Books page
        else
        {
            let query1 = "SELECT * FROM Books;";                    
            db.pool.query(query1, function(error, rows, fields){    
                res.render('books', {data: rows});                 
            })      
        }
    })
})

// Edit book page    
app.get('/edit_book', function(req, res)
{
    res.render('edit_book');                   
});                                         


/* Orders */
// Show all orders
app.get('/orders', function(req, res)
    {
        let query1 = "SELECT * FROM Orders;";                   // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('orders', {data: rows});                 // Render the orders.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

/* Employees */
// Show all employees
app.get('/employees', function(req, res)
    {
        let query1 = "SELECT * FROM Employees;";                // Define our query

        db.pool.query(query1, function(error, rows, fields){    // Execute the query

            res.render('employees', {data: rows});              // Render the employees.hbs file, and also send the renderer
        })                                                      // an object where 'data' is equal to the 'rows' we
    });                                                         // received back from the query

// Add new employee page    
app.get('/new_employee', function(req, res)
{
    res.render('new_employee');                   
});                                        

// Add a new employee
app.post('/new-employee-form', function(req, res){
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    
    // Create the query and run it on the database
    query1 = `INSERT INTO Employees (first_name, last_name) VALUES ('${data['first_name_input']}', '${data['last_name_input']}')`;
    db.pool.query(query1, function(error, rows, fields){
    
        // Check to see if there was an error
        if (error) {
    
            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        }
    
        // If there was no error, we redirect back to our Employees page
        else
        {
            let query1 = "SELECT * FROM Employees;";            
            db.pool.query(query1, function(error, rows, fields){    
                res.render('employees', {data: rows});             
            })                                          
        }
    })
})

// Edit employee page    
app.get('/edit_employee', function(req, res)
{
    res.render('edit_employee');                   
});                                         


/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on flip2.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.')
});