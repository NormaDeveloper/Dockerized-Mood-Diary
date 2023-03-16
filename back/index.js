const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');

// create server
const server = express();

// set express middleware
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 3001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// init and config data base
const db = new Database('./database.db', {
  //  to show data base logs in console
  verbose: console.log,
});

// api endpoints
server.get('/get-entries', (req, res) => {
  const query = db.prepare(`SELECT * FROM entries`);
  const entries = query.all();
  res.json(entries);
});

server.post('/create-entry', (req, res) => {
  if (req.body.description !== '' && req.body.mood !== '') {
    // get current date
    const date = new Date().toISOString();

    const insertEntry = db.prepare(
      'INSERT INTO entries (createdAt, description, mood) VALUES (?,?, ?)'
    );

    insertEntry.run(date, req.body.description, req.body.mood);

    const responseSuccess = {
      success: true,
    };
    res.json(responseSuccess);
  } else {
    const responseError = {
      success: false,
      error: 'Error',
    };
    res.json(responseError);
  }
});

server.put('/update-entry', (req, res) => {
  const id = req.body.id;
  const description = req.body.description;
  const mood = req.body.mood;

  const query = db.prepare(
    `UPDATE entries SET description = ?, mood = ? WHERE id = ?`
  );
  const resultUpdate = query.run(description, mood, id);

  resultUpdate.changes !== 0
    ? res.json({
        success: true,
        message: 'Entry modified.',
      })
    : res.json({ success: false, message: 'Entry not modified.' });
});
