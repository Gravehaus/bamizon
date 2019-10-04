var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  connection.query("SELECT * FROM products",  function(err, response){
    if (err) throw err;
    console.table(response);
    inquirer
      .prompt({
        name: "welcome",
        type: "list",
        message: "What would you like to do?",
        choices: ["BUY SOMETHING", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.welcome === "BUY SOMETHING") {
          buyItem();
        } else{
          connection.end();
        }
      });

  })
}

function buyItem() {
  // query the database 
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // 
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item do you want to buy? (enter the ID# or when selected, press enter)"
        },
        {
          name: "stock",
          type: "number",
          message: "How many would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if stock is enough
        if (chosenItem.stock_quantity > parseInt(answer.stock)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET stock_quantity = stock_quantity -  ? WHERE ?",
            [
              answer.stock,
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("We have enough in stock!");
              console.log("Thank you for your business! Your total is " + "$" + parseInt(answer.stock) * chosenItem.price);
              start();
            }
          );
        }
        else {
          // not enough stock
          console.log("Not enough in stock");
          start();
        }
      });
  });
}