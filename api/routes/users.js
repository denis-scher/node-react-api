const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');


router.get('/', (req, res, next) => {
    User.find()
    .exec()
    .then(docs => {
        console.log(docs);
        if (docs.length == 0) {
            res.status(200).json({
                message: "There are no users in the database"
            });
        }else{
            res.status(200).json(docs);}
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });

    })
});

router.post('/', (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email
    });
    user.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(201).json({
        message: 'New user has been created',
        user: user 
    });
});


router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec()
    .then(doc => {
        console.log("From database", doc);
        if (doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({
                message: "No such value"
            });
        }
        
    })
    .catch(err => {console.log(err);
        res.status(500).json({error:err});
    });
});


router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.deleteOne({_id: id})
        .exec()
        .then(result => {result.status(200).json(result);
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
    });
});




module.exports = router;