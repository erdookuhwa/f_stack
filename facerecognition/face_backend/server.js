const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


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
    ]
}

// home route
app.get('/', (request, response) => {
    // response.send('app is working!!!');
    response.send(database.users);
})

// signin route
app.post('/signin', (request, response) => {
    // bcrypt.compare("secret123", '$2a$10$iWuJplwckLJxQro3MVq1Ve3gDdoG1hK5IkC0jcBTp47Jk2dah.fRy', function(err, res) {
    //     console.log('first guess --> ', res)
    // });
    // bcrypt.compare("veggies", '$2a$10$azY3.smaer/gdk3Fz2xC/us2CwKBfH.p0n.blvt.njFGbNyylwQFu', function(err, res) {
    //     console.log('second guess --> ', res)
    // });
    if (request.body.email === database.users[0].email && request.body.password === database.users[0].password) {
        response.json('success!')
    } else {
        response.status(400).json('Big Fat Errrooorrrrr')
    }
})

// register route
app.post('/register', (request, response) => {
    const { name, email, password } = request.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log('hash is -> ', hash)
    })
    
    database.users.push({
        id: '3',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    response.json(database.users[database.users.length-1])
})

// user route
app.get('/profile/:id', (request, response) => {
    const { id } = request.params;
    let found = false;
    database.users.forEach( user => {
        if (user.id === id) {
            found = true;
            return response.json(user)
        }
    })
    if (!found) {
        return response.status(400).json('No such user!')
    }
})

app.put('/image', (request, response) => {
    const { id } = request.body;
    let found = false;
    database.users.forEach( user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return response.json(user.entries);
        }
    })
    if (!found) {
        return response.status(400).json('No entries for unknown user')
    }
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