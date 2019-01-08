const express = require('express');
const app = express();
const dbCreator = require('./dbCreator');

app.use(express.static("public"));
app.use(express.static("dist"));


dbCreator.createDb();

app.get('/timetable', function (req, res) {
    console.log('inside get timetable');
    const timeTable = dbCreator.getTimeTable();
    res.json(timeTable);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

