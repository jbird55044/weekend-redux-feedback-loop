const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// Get all feedback
router.get('/', (req, res) => {
  let queryText = 'SELECT * FROM "feedback" ORDER BY "date";';
  pool.query(queryText).then(result => {
    // Sends back the results in an object
    res.send(result.rows);
    console.log (`Returned data from Feedback`, result.rows);
  })
  .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
  });
}); 
 
// Adds a new book to the list of awesome reads
// Request body must be a book object with a title and author.
router.post('/',  (req, res) => {
  let newBook = req.body;
  console.log(`Adding book`, newBook);

  let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comment", "flagged", "date")
                   VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(queryText, [newBook.author, newBook.title])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new book`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
