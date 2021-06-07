const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'infinite',
      password : '',
      database : 'smart-brain'
    }
});

// db.select('*').from('users').then(response => console.log(response));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '1',
            name: 'Erdoo',
            email: 'erd@gmail.com',
            password: 'secret123',
            entries: 0,
            joined: new Date()
        },
        {
            id: '2',
            name: 'Shima',
            email: 'shima@gmail.com',
            password: 'pacify',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '9',
            hash: '',
            email: 'doo@gmail.com'
        }
    ]
}

// home route
app.get('/', (request, response) => {
    response.send('success');
})

// signin route
app.post('/signin', (request, response) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', request.body.email)
        .then(user => {
            const isValid = bcrypt.compareSync(request.body.password, user[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', request.body.email)
                    .then(user => {
                        response.json(user[0])
                })
                .catch(err => response.status(400).json('Error signing in'))
            } else {
                response.status(400).json('Invalid credentials')
            }
        })
        .catch(err => response.status(400).json('Invalid credentials'))
})

// register route
app.post('/register', (request, response) => {
    const { name, email, password } = request.body;
    const hash = bcrypt.hashSync(password);
        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return db('users')
                    .returning('*')
                    .insert({
                        name: name, 
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        response.json(user);
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
        })
        .catch(err => response.status(400).json('Registration failed'))
})

// user route
app.get('/profile/:id', (request, response) => {
    const { id } = request.params;
    db.select('*').from('users').where('id', id).then(user => {
        if (user.length) {
            response.json(user);
        } else {
            response.status(400).json('No user found!')
        }
    })
    // .catch(err => response.status(400).json('Error fetching user'))
})

app.put('/image', (request, response) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('*')
    .then(entries => {
        response.json(entries);
    })
    .catch(err => response.status(400).json('Unable to add entry'))
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})



/*
API Planning
/ = root --> response (app is working)
/signin --> POST, success/fail
/register --> POST, user profile object
/profile/:userId --> GET, return user
/image --> PUT --> user
*/