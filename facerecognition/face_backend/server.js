const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'infinite',
      password : '',
      database : 'smart-brain'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// home route
app.get('/', (request, response) => {
    response.send('success');
})

app.post('/signin', (request, response) => { signin.handleSignin(request, response, db, bcrypt) } );

app.post('/register', (request, response) => { register.handleRegister(request, response, db, bcrypt) } );

app.get('/profile/:id', (request, response) => { profile.handleProfile(request, response, db) } )

app.put('/image', (request, response) => { image.handleImage(request, response, db) } );

app.post('/imageurl', (request, response) => { image.handleClarifai(request, response) } );

app.listen(process.env.PORT, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})