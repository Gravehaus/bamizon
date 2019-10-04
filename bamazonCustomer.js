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
        choices: ["Purchase", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.welcome === "Purchase") {
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
              choiceArray.push(results[i].ProductName);
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
          if (results[i].ProductName === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if stock is enough
        if (chosenItem.StockQuantity < parseInt(answer.StockQuantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET StockQuantity = StockQuantity -  ? WHERE ?",
            [
              answer.StockQuantity,
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Item has been added to cart.");
              console.log("Thank you for your purchase! Your total is " + "$" + parseInt(answer.StockQuantity) * chosenItem.Price);
              start();
            }
          );
        }
        else {
          // 86'ed Item
          console.log("Currently Not Available");
          start();
        }
      });
  });
}






