-- Part 1
-- Create Database
CREATE DATABASE banking_system;
USE banking_system;
-- Table Creation 
-- Customers Table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Gender VARCHAR(10),
    Phone VARCHAR(20),
    Email VARCHAR(100),
    Address VARCHAR(150)
);

-- Accounts Table
CREATE TABLE Accounts (
    AccountID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    AccountType VARCHAR(30),
    Balance DECIMAL(12,2),
    CreatedDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Transactions Table
CREATE TABLE Transactions (
    TransactionID INT PRIMARY KEY AUTO_INCREMENT,
    AccountID INT,
    TransactionType VARCHAR(20),
    Amount DECIMAL(12,2),
    TransactionDate DATE,
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

-- Loans Table
CREATE TABLE Loans (
    LoanID INT PRIMARY KEY AUTO_INCREMENT,
    CustomerID INT,
    LoanType VARCHAR(50),
    LoanAmount DECIMAL(12,2),
    LoanDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Data Insertion
-- Customers (20 Records)
INSERT INTO Customers (FirstName, LastName, Gender, Phone, Email, Address) VALUES
('John','Smith','Male','012345678','john@gmail.com','Phnom Penh'),
('Emma','Brown','Female','012345679','emma@gmail.com','Siem Reap'),
('David','Johnson','Male','012345670','david@gmail.com','Battambang'),
('Sophia','Williams','Female','012345671','sophia@gmail.com','Kampot'),
('Michael','Jones','Male','012345672','michael@gmail.com','Takeo'),
('Olivia','Davis','Female','012345673','olivia@gmail.com','Kandal'),
('James','Miller','Male','012345674','james@gmail.com','Kep'),
('Emily','Wilson','Female','012345675','emily@gmail.com','Pursat'),
('Daniel','Moore','Male','012345676','daniel@gmail.com','Koh Kong'),
('Ava','Taylor','Female','012345677','ava@gmail.com','Prey Veng'),
('Liam','Anderson','Male','012345680','liam@gmail.com','Svay Rieng'),
('Mia','Thomas','Female','012345681','mia@gmail.com','Banteay Meanchey'),
('Noah','Jackson','Male','012345682','noah@gmail.com','Mondulkiri'),
('Charlotte','White','Female','012345683','charlotte@gmail.com','Ratanakiri'),
('Ethan','Harris','Male','012345684','ethan@gmail.com','Kratie'),
('Amelia','Martin','Female','012345685','amelia@gmail.com','Stung Treng'),
('Lucas','Thompson','Male','012345686','lucas@gmail.com','Oddar Meanchey'),
('Harper','Garcia','Female','012345687','harper@gmail.com','Pailin'),
('Benjamin','Martinez','Male','012345688','ben@gmail.com','Tboung Khmum'),
('Ella','Robinson','Female','012345689','ella@gmail.com','Kampong Cham');

-- Accounts (20 Records)
INSERT INTO Accounts (CustomerID, AccountType, Balance, CreatedDate) VALUES
(1,'Savings',2500,'2024-01-01'),
(2,'Checking',3000,'2024-01-02'),
(3,'Savings',1500,'2024-01-03'),
(4,'Checking',4200,'2024-01-04'),
(5,'Savings',5300,'2024-01-05'),
(6,'Checking',1100,'2024-01-06'),
(7,'Savings',2500,'2024-01-07'),
(8,'Checking',7000,'2024-01-08'),
(9,'Savings',800,'2024-01-09'),
(10,'Checking',9100,'2024-01-10'),
(11,'Savings',3200,'2024-01-11'),
(12,'Checking',4100,'2024-01-12'),
(13,'Savings',1500,'2024-01-13'),
(14,'Checking',7600,'2024-01-14'),
(15,'Savings',5000,'2024-01-15'),
(16,'Checking',6200,'2024-01-16'),
(17,'Savings',2800,'2024-01-17'),
(18,'Checking',3500,'2024-01-18'),
(19,'Savings',4700,'2024-01-19'),
(20,'Checking',6600,'2024-01-20');

-- Transactions (20 Records)
INSERT INTO Transactions (AccountID, TransactionType, Amount, TransactionDate) VALUES
(1,'Deposit',500,'2024-02-01'),
(2,'Withdraw',300,'2024-02-02'),
(3,'Deposit',700,'2024-02-03'),
(4,'Withdraw',200,'2024-02-04'),
(5,'Deposit',900,'2024-02-05'),
(6,'Withdraw',100,'2024-02-06'),
(7,'Deposit',400,'2024-02-07'),
(8,'Withdraw',600,'2024-02-08'),
(9,'Deposit',200,'2024-02-09'),
(10,'Withdraw',500,'2024-02-10'),
(11,'Deposit',300,'2024-02-11'),
(12,'Withdraw',700,'2024-02-12'),
(13,'Deposit',1000,'2024-02-13'),
(14,'Withdraw',450,'2024-02-14'),
(15,'Deposit',650,'2024-02-15'),
(16,'Withdraw',350,'2024-02-16'),
(17,'Deposit',800,'2024-02-17'),
(18,'Withdraw',250,'2024-02-18'),
(19,'Deposit',550,'2024-02-19'),
(20,'Withdraw',150,'2024-02-20');

-- Loans (20 Records)
INSERT INTO Loans (CustomerID, LoanType, LoanAmount, LoanDate) VALUES
(1,'Home Loan',50000,'2024-03-01'),
(2,'Car Loan',15000,'2024-03-02'),
(3,'Education Loan',10000,'2024-03-03'),
(4,'Business Loan',30000,'2024-03-04'),
(5,'Personal Loan',8000,'2024-03-05'),
(6,'Home Loan',60000,'2024-03-06'),
(7,'Car Loan',12000,'2024-03-07'),
(8,'Business Loan',25000,'2024-03-08'),
(9,'Education Loan',9000,'2024-03-09'),
(10,'Personal Loan',7000,'2024-03-10'),
(11,'Home Loan',55000,'2024-03-11'),
(12,'Car Loan',14000,'2024-03-12'),
(13,'Business Loan',27000,'2024-03-13'),
(14,'Education Loan',11000,'2024-03-14'),
(15,'Personal Loan',9500,'2024-03-15'),
(16,'Home Loan',65000,'2024-03-16'),
(17,'Car Loan',13000,'2024-03-17'),
(18,'Business Loan',35000,'2024-03-18'),
(19,'Education Loan',12000,'2024-03-19'),
(20,'Personal Loan',8500,'2024-03-20');

-- Part 2
-- Database Administration Team
-- michael
create user 'michael'@'localhost' identified by 'michael123$';
grant all privileges on banking_system.* to 'michael'@'localhost' with grant option;
-- jessica 
create user 'jessica'@'localhost' identified by 'jessica2023$';
-- grant
grant alter, create view, delete, select, insert, update on banking_system.* to 'jessica'@'localhost';
-- revoke & grant
revoke alter, create view, delete, select, insert, update on banking_system.* from 'jessica'@'localhost';
grant all privileges on banking_system.* to 'jessica'@'localhost';
-- james
create user 'james'@'localhost' identified by 'james2024$';
grant alter, create view, delete, select, insert, update on banking_system.* to 'james'@'localhost';

-- Development Team
-- david
create user 'david'@'localhost' identified by 'david123456$';
grant alter, create view, insert, select, update on banking_system.* to 'david'@'localhost';
-- matthew 
create user 'matthew'@'localhost' identified by 'matthew6789$';
grant create view, select, insert, update on banking_system.* to 'matthew'@'localhost';
-- emily 
create user 'emily'@'localhost' identified by 'emily1234$';
grant select, insert, update on banking_system.customers to 'emily'@'localhost';
grant select, insert, update on banking_system.accounts to 'emily'@'localhost';
grant select, insert, update on banking_system.transactions to 'emily'@'localhost';
-- john
create user 'john'@'localhost' identified by 'john1234$';
grant select, insert, update on banking_system.customers to 'john'@'localhost';
grant select, insert, update on banking_system.accounts to 'john'@'localhost';
grant select, insert, update on banking_system.transactions to 'john'@'localhost';
-- mario
create user 'mario'@'localhost' identified by 'mario1234$';
grant select, insert, update on banking_system.customers to 'mario'@'localhost';
grant select, insert, update on banking_system.accounts to 'mario'@'localhost';
grant select, insert, update on banking_system.transactions to 'mario'@'localhost';
-- Expire password after 100 days
alter user 'mario'@'localhost'
password expire interval 100 day;

-- grant perms verification
select * from mysql.user;
show grants for 'michael'@'localhost';
show grants for 'jessica'@'localhost';
show grants for 'james'@'localhost';
show grants for 'david'@'localhost';
show grants for 'matthew'@'localhost';
show grants for 'emily'@'localhost';
show grants for 'john'@'localhost';
show grants for 'mario'@'localhost';