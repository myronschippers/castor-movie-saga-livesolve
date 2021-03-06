const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`;

  // FIRST QUERY MAKES MOVIE
  pool
    .query(insertMovieQuery, [
      req.body.title,
      req.body.poster,
      req.body.description,
    ])
    .then((result) => {
      console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!

      const createdMovieId = result.rows[0].id;

      // Depending on how you make your junction table, this insert COULD change.
      const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movies_id", "genres_id")
      VALUES  ($1, $2);
      `;
      // SECOND QUERY MAKES GENRE FOR THAT NEW MOVIE
      pool
        .query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id])
        .then((result) => {
          //Now that both are done, send back success!
          res.sendStatus(201);
        })
        .catch((err) => {
          // catch for second query
          console.log(err);
          res.sendStatus(500);
        });

      // Catch for first query
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// GET - all movies returned
router.get('/', (req, res) => {
  pool
    .query(`SELECT * FROM "movies" ORDER BY "title" ASC;`)
    .then((dbResponse) => {
      res.send(dbResponse.rows);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// GET - only a single movie based on ID
router.get('/details/:id', (req, res) => {
  const queryText = `SELECT * FROM "movies"
    WHERE "movies".id = $1;`;
  const movieId = req.params.id;

  pool
    .query(queryText, [movieId])
    .then((dbResponse) => {
      // res.send(dbResponse.rows);
      const movieDetails = dbResponse.rows[0];

      const queryText2 = `SELECT "genres".id, "genres".name FROM "genres"
      JOIN "movies_genres" ON "genres".id = "movies_genres".genres_id
      WHERE "movies_genres".movies_id = $1;`;

      // QUERY FOR GENRES
      pool
        .query(queryText2, [movieId])
        .then((dbResponse) => {
          const movieGenres = dbResponse.rows;

          res.send({
            ...movieDetails,
            genres: movieGenres,
          });
        })
        .catch((err) => {
          console.log(err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
