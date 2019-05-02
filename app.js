const express = require("express");
const app = express();
const dbManager = require("./dbManager");
const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(express.static("dist"));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

dbManager.createDb();

app.get("/timetable", function(req, res) {
    // returns error if try to open site right after server is started
    dbManager
        .getTimeTable()
        .then(timetable => res.json(timetable))
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send(err.message);
        });
});

app.get("/bookTickets/:movieId", function(req, res) {
    // todo: uncomment if you would like to see error
    //res.status(400);
    //res.send('error happens');
    dbManager
        .getMovieChairs(req.params.movieId)
        .then(movieChairs => res.json(movieChairs))
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send(err.message);
        });
});

app.post("/bookTickets", function(req, res) {
    // todo: uncomment if you would like to see error
    //res.status(400);
    //res.send('error happens');
    dbManager
        .bookChairs(req.body.movieId, req.body.seatIds)
        .then(res.send("success"))
        .catch(err => {
            console.log(err);
            res.status(500);
            res.send(err.message);
        });
});

app.listen(3000, function() {
    console.log("Valamis cinema server is listening port 3000!");
});
