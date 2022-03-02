-- Dana Yarges
-- Amy Lucas
-- CS340
-- Project Step 4: This file contains the Data Manipulation Queries for the database.

-- Queries for displaying a complete table
SELECT * FROM Customers;
SELECT * FROM Books;
SELECT * FROM Employees;
SELECT * FROM Orders;
SELECT * FROM Order_items;

-- Queries for searching a table
-- : character used to denote the variables that will be entered by the user 
SELECT * FROM Customers WHERE first_name = :first_name_entered OR last_name = :last_name_entered;
SELECT * FROM Books WHERE title = :title_entered OR author = :author_entered;
SELECT * FROM Orders WHERE order_number = :order_number_entered;

-- Queries for inserting a new row in a table
-- : character used to denote the variables that will be entered by the user 
INSERT INTO Customers (first_name, last_name, email, street_address, city, state, zip_code) VALUES
     (:first_name_input, 
     :last_name_input, 
     :email_input, 
     :street_address_input, 
     :city_input, 
     :state_input, 
     :zip_code_input);

INSERT INTO Books (title, author, genre, price, quantity_in_stock) VALUES 
    (:title_input, 
    :author_input, 
    :genre_input, 
    :price_input, 
    :quantity_in_stock_input);

INSERT INTO Employees (first_name, last_name) VALUES 
    (:first_name_input, 
    :last_name_input);

INSERT INTO Orders (customer_id, employee_id, order_date, order_complete, to_be_shipped) VALUES 
    (:customer_id_input,
    :employee_id_input, 
    :order_date_input, 
    :order_complete_input, 
    :to_be_shipped_input);

INSERT INTO Order_items (order_number, book_id, quantity, order_item_complete) VALUES 
    (:order_number_input, 
    :book_id_input, 
    :quantity_input, 
    :order_item_complete_input);

-- Queries for updating (editing) a row in a table
-- : character used to denote the variables that will be selected or entered by the user 
UPDATE Customers SET 
    first_name = :first_name_update,
    last_name = :last_name_update, 
    email =  :email_update,
    street_address = :street_address_update,
    city = :city_update,
    state = :state_update,
    zip_code = :zip_code_update 
    WHERE customer_id = :customer_id_selected;

UPDATE Books SET 
    title = :title_update,
    author= :author_update,
    genre = :genre_update,
    price = :price_update,
    quantity_in_stock = :quantity_in_stock_update 
    WHERE book_id = :book_id_selected;

UPDATE Employees SET
    first_name = :first_name_update,
    last_name = :last_name_update
    WHERE employee_id = :employee_id_selected;

UPDATE Orders SET 
    customer_id = :customer_id_update,
    employee_id = :employee_id_update,
    order_date = :order_date_update,
    order_complete = :order_complete_update,
    to_be_shipped = :to_be_shipped_update
    WHERE order_number = :order_number_selected;

UPDATE Order_items SET 
    quantity = :quantity_update,
    order_item_complete = :order_item_complete_update
    WHERE order_number = :order_number_selected AND book_id = :book_id_selected;

-- Queries for deleting a row in a table
-- : character used to denote the variables that will be selected by the user 
DELETE FROM Customers WHERE customer_id = :customer_id_selected;
DELETE FROM Books WHERE book_id = :book_id_selected;
DELETE FROM Employees WHERE employee_id = :employee_id_selected;
DELETE FROM Orders WHERE order_number = :order_number_selected;
DELETE FROM Order_items WHERE order_number = :order_number_selected AND book_id = :book_id_selected;