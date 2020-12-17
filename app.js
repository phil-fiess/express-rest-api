//import express package
const express = require('express')

const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//env variables
require('dotenv/config');

//middlewares 
app.use(cors());
app.use(bodyParser.json);

//Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);

//homepage route
app.get('/', (req, res) => {
    res.send('On home page');
});


//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log('connected to DB')
);


//server listener (port 3000)
app.listen(port);
