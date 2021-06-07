const handleSignin = (request, response, db, bcrypt) => {
    const { email, password } = request.body; 
    if (!email || !password ) {
        response.status(400).json('Incorrect Signin credentials')
    }
    db.select('email', 'hash').from('login')
    .where('email', '=', email)
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        response.json(user[0])
                })
                .catch(err => response.status(400).json('Error signing in'))
            } else {
                response.status(400).json('Invalid credentials')
            }
        })
        // .catch(err => response.status(400).json('Invalid credentials'))
};

module.exports = {
    handleSignin: handleSignin
}