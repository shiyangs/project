var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('Mongodb://localhost:27017');
var Schema = mongoose.Schema;

var userDataSchema = new Schema({
    name: String,
    password: String,
    city: String
});

var UserData = mongoose.model('UserData', userDataSchema);

var t = 1;
/* GET home page. */

// get all info in database
router.get('/', function(req,res,next) {
    UserData.find({}, '-_id -__v', (function(err, doc) {
        if(doc) {
            res.json(doc);
        }
    }))
});


// check if given data is in database, if not add it
router.get('/:p1', function(req, res, next) {
    UserData.findOne({string: req.params.p1}, function(err, doc){
        if(doc == null) {
            console.log('add');
            var data = new UserData({string: req.params.p1, length: req.params.p1.length});
            data.save();
        }
        res.json({string: req.params.p1, length: req.params.p1.length});
    })

});


// same as get /:
router.post('/', function(req,res,next) {
    if (req.body.name == '') {res.json({message: 'provide a string'})}
    else {
        UserData.find({string: req.body.name}, '-_id -__v', function (err, doc) {
            if (doc == '') {
                var data = new UserData({name: req.body.name,});
                data.save();
                console.log('test');
                console.log(data);
                res.json(data);
            }
            console.log(doc);
            res.json(doc);
        });
    }
});

// delete a string
router.delete('/:p1', function(req, res, next) {
    UserData.findOne({string: req.params.p1}, function(err, doc){
        if(doc == null) {

            res.json({message: 'string not found'})
        }
        else{
            var _id = doc._id;
            UserData.findByIdAndRemove(_id, function(err, doc) {
                res.json({message: 'success'})

            })
        }

        //res.json({string: req.params.p1, length: req.params.p1.length});
    })

});



module.exports = router;
