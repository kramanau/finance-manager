# finance-manager

## Self-evaluation
The project was a great challenge to deploy. A couple of things that I learned are that planning out all the routes and database tables before hand really helped me define and understand the boundaries of my application and made it a lot faster to code. I also learned that testing was very useful in getting things to work properly, especially getting unit tests to pass for the combination of the category and transcational routes. 

Things that went well were the coding part because I had pretty robust definitions before starting. Getting the application deployed on railway was also pretty straight forward from the previous class that we had that went over it. Things that went poorly were some tests took longer than they should have to work because I was not too familiar with jest. Another thing that went poorly was that I had to redo some of the database collection models because one of the attributes was pretty useless (attribute = type, this was used to define income or expense but in reality the user would just input a negative amount so I removed it).


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
**Week 1**: 
- [x] Create initial project structure.
- [x] Implement authentication and authorization using the previous assignments as a backbone.
- [x] Category CRUD operations.
- [x] Category route tests.
<br>

**Week 2**:
- [x] Create the transactions routes.
- [x] Test transaction routes with category routes.
- [x] Transaction route tests.
- [x] Deploy application.
- [x] Test deployed application (Postman).

