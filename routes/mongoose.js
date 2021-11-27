/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
const mongoose = require('mongoose')

/* Connnect to our database */
// Get the URI of the local database, or the one specified on deployment.
// Local databse url
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/StudentAPI'
// const mongoURI = 'mongodb://localhost:27017/StudentAPI'
const mongoURI = 'mongodb+srv://dbUser:dbUserPassword@cluster0-shzou.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', function () {

    connection.db.collection("users", function(err, collection){
        collection.find({}).toArray(function(err, data){
            collection.createIndex({ username: 'text', firstname: 'text', lastname: 'text' });
        });

    });

});



console.log('we connected to our database');
module.exports = { mongoose }  // Export the active connection.