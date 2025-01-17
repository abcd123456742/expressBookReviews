const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Function to check if the user exists
const doesExist = (username) => {
    let userswithsamename = users.filter((user) => {
      return user.username === username;
    });
    return userswithsamename.length > 0;
  };


// Route to handle user registration
public_users.post("/register", (req, res) => {
    const username = req.body.user.username;
    const password = req.body.user.password;
  
    if (username != "" && password != "") {
      if (!doesExist(username)) {
        users.push({ "username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login" });
      } else {
        return res.status(404).json({ message: "User already exists!" });
      }
    }
    return res.status(404).json({ message: "Unable to register user." });
  });

// Get the book list available in the shop
let myPromise = new Promise((resolve,reject) => {
    public_users.get('/',function (req, res) {
        resolve("Promise resolved")
  return res.send(JSON.stringify(books,null,4));
});
})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  // Handle the rejected state of the promise
myPromise.catch((error) => { 
  // This block will execute if the promise is rejected
  console.error(error); // "The operation failed!"
})
//Console log after calling the promise
  console.log("After calling promise");

   myPromise = new Promise((resolve,reject) => {
	
	// Code here
	// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  resolve("Promise resolved")
  // Assuming the numbers are the isbn
  
  return res.send(books[isbn]);
 });
	
})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  // Handle the rejected state of the promise
myPromise.catch((error) => { 
  // This block will execute if the promise is rejected
  console.error(error); // "The operation failed!"
})
//Console log after calling the promise
  console.log("After calling promise");
  
  myPromise = new Promise((resolve,reject) => {
	
	// Code here
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    resolve("Promise resolved")
   let author = req.params.author;
    let n = 0;
   for (let i = 1; i < 11; i++) {
    if (books[i].author == author){
        n = i;
        break;
    }     
  };

  return res.send(books[n]);
});
	
})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  // Handle the rejected state of the promise
myPromise.catch((error) => { 
  // This block will execute if the promise is rejected
  console.error(error); // "The operation failed!"
})
//Console log after calling the promise
  console.log("After calling promise");

  myPromise = new Promise((resolve,reject) => {
	// Code here
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
	resolve("Promise resolved")
  let title = req.params.title;
  let n = 0;

  for (i=1;i<11;i++){
    if (books[i].title == title) {
        n = i;
        break;
    }
  };

  return res.send(books[n]);
});
	
})

//Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.
myPromise.then((successMessage) => {
    console.log("From Callback " + successMessage)
  })

  // Handle the rejected state of the promise
myPromise.catch((error) => { 
  // This block will execute if the promise is rejected
  console.error(error); // "The operation failed!"
})
//Console log after calling the promise
  console.log("After calling promise");

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  return res.send(books[isbn].reviews);
});



module.exports.general = public_users;
