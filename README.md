# Expense Reimbursement System (ERS)

## Overview

The Expense Reimbursement System (ERS) will manage the process of reimbursing employees for expenses incurred while on company time. All employees in the company can login and submit requests for reimbursement and view their past tickets and pending requests. Finance managers can log in and view all reimbursement requests and past history for all employees in the company. Finance managers are authorized to approve and deny requests for expense reimbursement.

## Technologies Used
- JavaScript
- NodeJS
- ExpressJS
- AWS DynamoDB

## Lessons Learned
I learned how to implement a 3-tier architecture for my REST API using ExpressJS. Using JWT to authenticate users so that managers and employees can access what they need to. I learned how to use IAM and DynamoDB to store the data for my API. I used Postman to test the functionality of my API to verify.

## Future Updates
Employees can add Reimbursement Types
- Travel, Lodging, Food, Other
- Employees can view previous requests filtered by type

Managers can change other users’ roles
- Employee to Manager or back to Employee

Employees can add images of receipts to their reimbursement requests
-Upload and store images (in SQL or cloud storage)

User Profile/Account
-Track additional user information (name, address, etc.)
- Users can edit their account
- Users can add a profile picture

## Contributors
- Lennard Vicente
