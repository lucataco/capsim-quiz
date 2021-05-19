# Capsim Software Engineer Challenge

## About

This is a project involving a quiz and chart that aim to accomplish the following:
-Displays questions and answers fetched from the backend
-Questions are either single or multiple choice
-Once a quiz is submitted, the final score would pop up
-Final score is points accrued/ total possible points and a percentage
-The Report page shows a bar chart that has # of people scored vs scoring bracket

This project uses the PERN stack. Postgres, Express, React and Node.

## How to run globally

This project has been uploaded to heroku as a "production" instance @:
[https://capsim-quiz.herokuapp.com/](https://capsim-quiz.herokuapp.com/)

## How to run locally

To run on your machine, git clone the repo and run the client and server locally. These steps assume that you already have a local postgres db running on your machine.

Download the project:

### `git clone https://github.com/lucataco/capsim-quiz.git`

Go to the project folder:

### `cd capsim-quiz`

Install the packages:

### `npm i`

Start up the server:

### `npm start`

Create the tables in the database:

### `cat dbSchela.sql | psql -U postgres`

Now populate the tables with the Questions and Answers for the Sample quiz

### `cat dbData.sql | psql -U postgres`

To start the client side, in a different process/tab/console window run the client:

### `cd client`

### `npm start`

You should now have the React application pop up and running

This project was developed by Luis Catacora
