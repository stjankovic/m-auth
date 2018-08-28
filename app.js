const express = require('express');
const cors = require('cors');
const parse = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const db = require('./_config/keys').mongoURI; 
const UserController = require('./_api/_user/user_control');

app.use(parse.json());
app.use(cors());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>  console.log(`Mongo connected`))
  .catch(() => console.log(`Mongo not connected`));

app.use('/users', UserController);

app.listen(port, () => console.log(`Sever on http://localhost:${port}`));
