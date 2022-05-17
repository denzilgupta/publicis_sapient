const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.Promise = global.Promise;

/**********************************************************
 * @DESC        -   Database Configuration and Connection
***********************************************************/
const database = 'mongodb+srv://denzilgupta:ugCjtfAskKafNTWM@cluster0.7tbap.mongodb.net/publicis_sapient?retryWrites=true&w=majority';

mongoose
    .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB.'))
    .catch(error => console.log(error));

/**************************************************************
 * @DESC        -   Body-Parser Middlewear
***************************************************************/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((request, response, next) => {
    response.header("Access-Control-Allowed-Origin", '*');
    response.header(
        "Access-Control-Allowed-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allowed-Origin', 'PUT, POST, PATCH, GET, DELETE');
        return response.status(200).json({});
    }
    next();
});

/**************************************************************
* @DESC        -   Receiving the routes constant
***************************************************************/
const TestAPI = require('./server/Routes/TestAPI.js');
const CreditCardAPI_routes = require('./server/Routes/CreditCardAPI.js');

/**************************************************************
 * @DESC        -   API Routes
***************************************************************/
app.use('/api/test', TestAPI);
app.use('/api/credit-card', CreditCardAPI_routes);


/**************************************************************
 * @DESC        -   Handling all errors.
***************************************************************/
app.use((request, response, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, request, response, next) => {
    response.status(error.status || 500);
    response.json({ error: { message: error.message } })
});

module.exports = app;