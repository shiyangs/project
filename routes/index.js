var express = require('express');
var router = express.Router();

var weather = require('request');
var history = require('request');

var city = 'new york';
//get from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
/* GET home page. */

router.get('/', function(req, res, next) {
    var d = new Date().getDate();
    var m = new Date().getMonth();
    m = m+1;
    if(d) {


    url = 'http://history.muffinlabs.com/date/'+m+'/'+d;
    history(url, function (err, response, body) {
        if(body) {
            let main = JSON.parse(body);
            res.send(main.data.Births);
            res.render('index.html');
            var dates = main.date;
            var l_events = main.data.Events.length;
            //console.log(getRandomInt(l_events));
            var events = main.data.Events[getRandomInt(l_events)];

            var l_birth = main.data.Births.length;
            var birth = main.data.Births[getRandomInt(l_birth)];
            var l_death = main.data.Deaths.length;
            var death = main.data.Deaths[getRandomInt(l_death)];

        }
    })
    }
});


//sign in page
router.post('/signIn', function(req, res, next) {
    var name = req.body.name;
    var key = req.body.password;
    //go back to main page
})

// sign up page


router.post('/', function(req,res,next) {
    if (req.body.city == '') {res.json({message: 'provide a string'})}
    else {
        let city = req.body.city;

        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=38346c77bb4aaa8d93b9a21d9e6350f7&units=metric`

        weather(url, function (err, response, body) {
            if(err){
                console.log('error:', error);
            } else {
                let main = JSON.parse(body);
                if(main.cod == 200) {
                    let weather = main.weather[0].main;
                    let temp = main.main.temp;
                    let hum = main.main.humidity;
                    res.status(200).json({'weather': weather, 'tempurature': temp + ' °C', 'humidity': hum});
                } else {
                    res.status(200).json(main);
                }
            }
        });

    }
});

module.exports = router;
