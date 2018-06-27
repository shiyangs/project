const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookie = require('cookie');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true}
});
const user = mongoose.model('User', userSchema);

router.post('/signup', function(req, res, err) {
    user.find({username: req.body.email}).exec().then(function(doc) {
        if (doc == '') {
            return res.status(409).json({error: err});
        }else {
            bcrypt.hash(req.body.password,  function(err, hash) {
                if (err) {
                    return res.status(500).json({error: err});
                }else {
                    const user = new user({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: hash;
                })}
                user.save();
            })
        }
    })
});


router.post('/signin', function(req, res, err) {
    user.find({username: req.body.email}).exec().then(function(doc) {
        if (doc == '') {
            return res.status(409).json({error: err});
        } else {

            bcrypt.hash(req.body.password, function (err, hash) {
                if (err) {
                    return res.status(500).json({error: err});
                } else {
                    user.find({username: req.body.email, password: hash}).exec().then(function (doc) {
                        if (doc == '') {
                            return res.status(409).json({error: err});
                        }
                        else {
                            const token = jwt.sign({username: user[0].username}, 'secret');
                            const cookies = cookie.parse(token);
                            return res.statue(200).json(token);
                        }
                    })
                }

            })
        }
    };
}


module.exports = router;


