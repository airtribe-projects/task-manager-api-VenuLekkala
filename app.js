const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Sample data
const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Matrix', director: 'Lana Wachowski', year: 1999 },
  { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

  app.get('/api/movies', (req,res) => {
      res.status(200).send(movies);
  });

   app.get('/api/movies/:id', (req,res) => {
    const id = req.params.id;
    const movie = movies.find(m => m.id === parseInt(id));
    if(!movie) {
      return res.status(404).send('Movie not found');
    }
    res.status(200).send(movie);
  });

  app.post('/api/movies', (req,res) => {
    if(!req.body.title)
    {
      return res.status(400).send('Title is required');
    }
    const movie = req.body;
    movie.id = movies.length + 1;
    movies.push(movie);
    return res.status(201).send(movie);
  });

  app.put("/api/movies/:id", (req, res) => {
     const id = req.params.id;
     const movie = movies.find(m => m.id === parseInt(id));
     if(!movie) {
       return res.status(404).send('id not found');
     }
      movie.title = req.body.title;
      movie.director = req.body.director;
      movie.year = req.body.year;
    return res.status(200).send(movie);
  });

  app.delete("/api/movies/:id", (req, res)=> {
    const id = req.params.id;;
    const movie = movies.find(m => m.id === parseInt(id));
    if(!movie) {
      return res.status(404).send('id not found');
    }
    const index = movies.indexOf(movie);
    movies.splice(index, 1);
    return res.status(200).send(movie);
  });

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;