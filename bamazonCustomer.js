const mysql = require('mysql');
const Table = require('cli-table');
const inquirer = require('inquirer');


//USE npm install cli-table FOR NODE ACCESS
//MORE INFORMATION ON CLI-TABLES: https://www.npmjs.com/package/cli-table

const displayTable = require('./constructorDisplay.js');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'heavyrain41590!', //your mysql workbench password goes here
  database:  'bamazon'
});

connection.connect(function (err) {
  if (err) {
    console.log('Error connecting to Db');
    throw err;
  }
});

// Display products database using a table made with the npm package cli-table2
// then Prompt the user to determine item and quantity they want to purchase
var displayForUser = function() {
  var display = new displayTable();
  connection.query('SELECT * FROM products', function(err, results){
    display.displayInventoryTable(results);
    purchaseItem();
  });
}

// TELLS THE USER TO PICK SOMETHING BY ITEM ID
const purchaseItem = function() {
  console.log('\n  ');
  inquirer.prompt([{
    name: "id",
    type: "input",
    message: " Enter the Item ID of the product you want to purchase",

  }, {
    name: "quantity",
    type: "input",
    message: " Enter the quantity you want to purchase",

  }]).then(function(answer) {
    // ASKS THE DB IF SOMETHING IS IN STOCK, AND HOW MANY.
    connection.query('SELECT ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ?', {ItemID: answer.id}, function(err,res) {

      console.log('\n  You would like to buy ' + answer.quantity + ' ' + res[0].ProductName + ' ' + res[0].DepartmentName + ' at $' + res[0].Price + ' each'
      );
      if (res[0].StockQuantity >= answer.quantity) {
        const itemQuantity = res[0].StockQuantity - answer.quantity;
        connection.query("UPDATE products SET ? WHERE ?", [
          {
            StockQuantity: itemQuantity
          }, {
            ItemID: answer.id
          }], function(err,res) {
        });
        const cost = res[0].Price * answer.quantity;
        console.log('\n  Order fulfilled! Your cost is $' + cost.toFixed(2) + '\n');
        // Order completed
        customerPrompt();

      } else {
        //IF ITEM IS UNAVAILABLE, THIS MESSAGE GENERATES
        console.log('\n  Sorry, Insufficient quantity to fulfill your order!\n');
        // ORDER CANNOT BE COMPLETED.
        customerPrompt();
      }
    })
  });
}

const customerPrompt = function() {
  inquirer.prompt({
    name: "action",
    type: "list",

    message: " Would like to continue shopping?\n",
    choices: ["Yes", "No"]
  }).then(function(answer) {
    switch(answer.action) {
      case 'Yes':
        displayForUser();
        break;

      case 'No':
        connection.end();
        break;
    }
  })
};

// Start app by Prompting the customer
customerPrompt();