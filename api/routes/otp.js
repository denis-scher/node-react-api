const express = require('express');
const router = express.Router();
const codeGenerator = require('../../codegenerator')
const sendEmail = require('../../emailsender');
const mongoose = require('mongoose');
const User = require('../models/user');


router.get('/:email', async (req, res, next) => {
    let email = req.params.email;
    console.log('initial email: ' + email);
    async () => {
        const _user = await User.find({email: email});
        email = _user.email;
    }
    console.log('second email: ' + email);
    let code = "";
    console.log('1:' + typeof code);
    await codeGenerator()
    .then(_code => {
        console.log(_code); 
        code = _code;
        sendEmail(email,code);
    })
    .catch(error => {
        console.error("Error:", error); 
    });
    console.log('2:' + typeof code);
    res.status(200).json({});
    

});




module.exports = router;