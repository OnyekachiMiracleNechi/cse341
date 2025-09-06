/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('myDatabase');

db.contacts.insertMany([
  {
    firstName: "Onyekachi",
    lastName: "Nechi",
    email: "kachi@example.com",
    favoriteColor: "Blue",
    birthday: "1998-06-15"
  },
  {
    firstName: "Mary",
    lastName: "Johnson",
    email: "mary.johnson@example.com",
    favoriteColor: "Green",
    birthday: "2000-09-22"
  },
  {
    firstName: "James",
    lastName: "Okoro",
    email: "james.okoro@example.com",
    favoriteColor: "Red",
    birthday: "1995-12-05"
  }
]);