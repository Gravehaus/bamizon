
//INSTALL CLI-TABLE2 TO AUTO GENERATE A TABLE FOR USER.
//USE npm install cli-table2 FOR TABLE GENERATION
//MORE INFORMATION ON CLI-TABLES: https://www.npmjs.com/package/cli-table2

// const port = process.env.PORT || 3306 ;
// console.log('Server is running on port: ' + port);

Table = require('cli-table2');
const displayTable = function() {

  this.table = new Table({
    head: ['Item ID', 'Product Name', 'Price', 'Stock Quantity'],
  });

  this.displayInventoryTable = function(results) {
    this.results = results;
    for (var i=0; i <this.results.length; i++) {
      this.table.push(
        [this.results[i].ItemID, this.results[i].ProductName, '$'+ this.results[i].Price, this.results[i].StockQuantity] );
    }
    console.log('\n' + this.table.toString());
  };
}
module.exports = displayTable;