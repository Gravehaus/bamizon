-- Creates the "bamazon" database --
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products (
  ItemID INTEGER(11) AUTO_INCREMENT NOT NULL,
  ProductName  VARCHAR(100) NOT NULL,
  DepartmentName VARCHAR(150) NOT NULL,
  Price DECIMAL(10,2),
  StockQuantity INTEGER(10),
  PRIMARY KEY (ItemID)
);

INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Mountain Dew AMP GAME FUEL, 4 Flavor Variety Pack", "GAMER FUEL", 19.95, 20);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Doritos Flamin' Hot Nacho, 1oz (40 Count)", "GAMER FUEL", 14.95, 25);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Microsoft Xbox One X 1Tb Console With Wireless Controller", "HARDWARE", 399.99, 7);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Nintendo Switch – Neon Red and Neon Blue Joy-Con", "HARDWARE", 299.99, 6);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("PlayStation 4 Pro 1TB Console", "HARDWARE", 378.99, 5);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("The Last of Us Part II - PlayStation 4 Special Edition", "GAMES", 79.99, 2);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Call of Duty: Modern Warfare", "GAMES", 59.99, 8);
INSERT INTO products ( ProductName,DepartmentName,Price,StockQuantity)
VALUES ("Legend of Zelda Link's Awakening", "GAMES", 59.99, 3);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("POKEMON SHIELD", "GAMES", 59.99, 10);
INSERT INTO products (ProductName,DepartmentName,Price,StockQuantity)
VALUES ("POKEMON SWORD", "GAMES", 59.99, 10);

select * FROM products