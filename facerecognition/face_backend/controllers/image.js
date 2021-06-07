const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '0e3bef19a40045b5ad2cf8074b70b620'
});

const handleClarifai = (request, response) => {
    const { input } = request.body;
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => {
            response.json(data);
        })
        .catch(err => response.status(400).json('API fetch failed') )
}

const handleImage = (request, response, db) => {
    const { id } = request.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        response.json(entries[0]);
    })
    .catch(err => response.status(400).json('Unable to add entry'))
};

module.exports = {
    handleImage: handleImage,
    handleClarifai: handleClarifai
}