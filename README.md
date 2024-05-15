# finance-manager

## Description
This is a personal finance backend application that caters to individuals needing to track income and expenses. It provides an CRUD API for users to create transactions, assign a category to them, and to keep track of the totals of categories. 

## Problem
This application will attempt to solve the problem of individuals struggling to manage their finances. It will allow a user to keep track of their finances in a more streamlined way of assigning a category to a transaction and looking at how much money they spend on that category.

## Techincal Components
The app will allow a user to create a transaction and set the category as well.
### Routes
### Transactions
| Type | Route | Description |
| ----------- | ----------- | ----------- |
| POST | /transactions | create new transaction |
| GET | /transactions | get transactions |
| GET | /transactions/:id | get transaction by id |
| PUT | /transactions/:id | update a transaction by id |
| DELETE | /transactions/:id | delete a transaction by id |

### Category
| Type | Route | Description |
| ----------- | ----------- | ----------- |
| POST | /category | create new category |
| GET | /category | get all categories |
| GET | /category/:id | get category by id |
| GET | /category/:id/transactions | get all transactions for a category |
| GET | /category/:id/total | get the sum of all transactions for a category |
| PUT | /category/:id | update a category by id |
| DELETE | /category/:id | delete a category by id |

### Data Models
### Transactions
| Name | Type | Etc |
| ----------- | ----------- | ----------- |
| id | number | primary key |
| amount | number |  |
| type | string |  |
| description | string |  |
| date | date |  |
| category_id | number | foreign key |

### Category
| Name | Type | Etc |
| ----------- | ----------- | ----------- |
| id | number | primary key |
| name | string |  |
| description | string |  |

### Timeline 
**Week 1**: Create initial project structure and start by implementing authentication and authorization using the previous assignments as a backbone. Then I will start with creating the category CRUD operations along with tests to the routes. <br>
**Week 2**: Create the transactions routes and test with the category routes to make sure they work together. Add tests to the transaction routes and deploy the application.

