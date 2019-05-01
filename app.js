const express = require('express');
const app = express();
const dbCreator = require('./dbCreator');
const bodyParser = require('body-parser');

app.use(express.static("public"));
app.use(express.static("dist"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

dbCreator.createDb();

app.get('/timetable', function (req, res) {    
    dbCreator.getTimeTable().then(timetable => res.json(timetable)).catch(err => console.log(err));        
});

app.get('/bookTickets/:movieId', function (req, res) {
    var movieId = req.params.movieId;
    dbCreator.getMovieChairs(movieId).then(movieChairs => res.json(movieChairs)).catch(err => console.log(err));
});

app.post('/bookTickets', function(req, res){
    console.log(`inside book tickets for movie ${req.body.movieId}`);
    // todo: uncomment if you would like to see error
    //res.status(400);
    //res.send('error happens');
    dbCreator.bookChairs(req.body.movieId, req.body.seatIds).then(res.send("success")).catch(err => console.log(err));
});



app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

