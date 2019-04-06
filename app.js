const express = require('express');
const app = express();
const dbCreator = require('./dbCreator');

app.use(express.static("public"));
app.use(express.static("dist"));


dbCreator.createDb();

app.get('/timetable', function (req, res) {    
    dbCreator.getTimeTable().then(timetable => res.json(timetable)).catch(err => console.log(err));        
});

// study how to route with express and react
app.get('/book', function (req, res) {
    res.render("Tickets");
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

