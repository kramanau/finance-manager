# finance-manager

## Description
This is a personal finance backend application that caters to individuals needing to track income and expenses. It provides an CRUD API for users to create transactions and keep track of them. 

## Problem
This application will attempt to solve the problem of individuals struggling to manage their finances.

## Techinal Components
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
