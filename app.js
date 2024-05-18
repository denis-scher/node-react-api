const express = require('express');
const app = express();
const usersRoutes = require('./api/routes/users');
const otpRoutes = require('./api/routes/otp');
const morgan = require('morgan');
const parser = require('body-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://node-api:' + process.env.MONGO_ATLAS_PW + '@node-api.a8qdsqd.mongodb.net/?retryWrites=true&w=majority&appName=node-api'
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

app.use('/users', usersRoutes);
app.use('/otp', otpRoutes);

app.use((req,res,next) =>{
    const error =  new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;