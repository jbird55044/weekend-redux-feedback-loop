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
  let newFeedback = req.body;
  console.log(`Adding Feedback`, newFeedback);

  let queryText = `INSERT INTO "feedback" ("feeling", "understanding", "support", "comments", "flagged", "date")
                   VALUES ($1, $2, $3, $4, $5, $6);`;
  pool.query(queryText, [newFeedback.feeling, newFeedback.understanding, newFeedback.support, newFeedback.comments, newFeedback.flagged, newFeedback.date])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(error => {
      console.log(`Error adding new feedback`, error);
      res.sendStatus(500);
    });
});

// Get all feedback
router.delete('/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('Delete request for id', reqId);
    let sqlText = 'DELETE FROM feedback WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('Feedback Item deleted', reqId);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500); // Good server always responds
        })
})


module.exports = router;
