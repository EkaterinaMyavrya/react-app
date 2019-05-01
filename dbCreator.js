const utils = require('./utils');
const sqlite3 = require("sqlite3").verbose();

function _getTimeTable(callBack) {    
    const db = _openDb();
    let timeTable = [];
                 
    const sql = "select Shows.id as id, Shows.time as time, Shows.movie as movie, " +
                "Halls.name as hall, Halls.id as hallId from Shows " +
                "join Halls on Halls.id = Shows.hall " +
                "order by Shows.id ";
    
    let promisifiedDbAll = utils.promisify(db.all.bind(db));
    promisifiedDbAll(sql, [])
        .then(rows => 
            {
                rows.forEach((row) => {
                    console.log(
                            `date: ${row.time} movie: ${
                                row.movie
                            } hall: ${
                                row.hall
                            }   hallId: ${row.hallId}`
                    );
                        // "2019-01-01 18:00:00"
                    timeTable.push({
                            id: row.id,
                            datetime: new Date(
                                Date.parse(row.time)
                            ),
                            movie: row.movie,
                            hallId: row.hallId,
                            hall: row.hall
                    });
                }); 

                callBack(null, timeTable);
            }
        ).catch(err => {
            callBack(err, timeTable);
        });   
        
    _closeDb(db);
};


function _getMovieChairs(movieId, callBack) {

    const db = _openDb();
    let movieChairs = [];

    let idHall = 0;
    let sql =`select hall from Shows
            where Shows.id = ?`;

    let promisifiedDbGet = utils.promisify(db.get.bind(db));
    promisifiedDbGet(sql, [movieId])
        .then(row => {             
                idHall = row.hall;
                console.log(idHall);

                const db2 = _openDb();

                let promisifiedDbAll = utils.promisify(db2.all.bind(db));
                sql = `select Seats.id as seatId, Seats.row as row, Seats.seat as seat 
                    from Seats
                where Seats.id_hall = ?
                order by Seats.id `;

                console.log('inside promisifiedDbGet');

                promisifiedDbAll(sql, [idHall])
                    .then(rows => {
                        rows.forEach((row) => {
                            console.log(
                                `seatId: ${
                                row.seatId
                                } row: ${
                                row.row
                                }   seat: ${row.seat}`
                            );
                            // "2019-01-01 18:00:00"
                            movieChairs.push({
                                id: row.seatId,
                                row: row.row,
                                seat: row.seat
                            });
                        });

                        callBack(null, movieChairs);
                    }
                    ).catch(err => {
                        callBack(err, movieChairs);
                    });

                _closeDb(db2);
            })  
            .catch(err => {
                callBack(err, movieChairs);
            });     

    _closeDb(db);
};


function _getMovieChairs(movieId, callBack) {

    const db = _openDb();
    let movieChairs = [];

    let idHall = 0;
    let sql =`select hall from Shows
            where Shows.id = ?`;

    let promisifiedDbGet = utils.promisify(db.get.bind(db));
    promisifiedDbGet(sql, [movieId])
        .then(row => {             
                idHall = row.hall;
                console.log(idHall);

                const db2 = _openDb();

                let promisifiedDbAll = utils.promisify(db2.all.bind(db2));
                sql = `select Seats.id as seatId, Seats.row as row, Seats.seat as seat 
                    from Seats
                where Seats.id_hall = ?
                order by Seats.id `;

                console.log('inside promisifiedDbGet');

                promisifiedDbAll(sql, [idHall])
                    .then(rows => {
                        rows.forEach((row) => {                          
                            movieChairs.push({
                                id: row.seatId,
                                row: row.row,
                                seat: row.seat,
                                state: "free"
                            });
                        });
                                    
                        getBookedChairs(movieId).then(
                            seatsIds =>
                            {
                                seatsIds.forEach(seatId =>
                                {
                                    movieChairs.find(chair => chair.id == seatId).state = "booked";     
                                });
                                
                                callBack(null, movieChairs);
                            }
                        ).catch(err => callBack(err, movieChairs))                      
                    }).catch(err => callBack(err, movieChairs));

                _closeDb(db2);
            })  
            .catch(err => callBack(err, movieChairs));     

    _closeDb(db);
};


function _bookChairs(movieId, seatIds, callBack) {
    try{
        const db = _openDb();   
        console.log(`inside book tickets for movie ${movieId}`);
        if (seatIds && Array.isArray(seatIds)){
            stmt = db.prepare("insert into Booking (show, seat) values (?,?)");
            seatIds.forEach((seatId) => {
                console.log(`inside book tickets for movie ${seatId}`);
                stmt.run(movieId, seatId);
                }
            );
            stmt.finalize();
        }
        _closeDb(db);
    }
    catch(err){
        callBack(err, null);
    }

    callBack(null, "success");
};


function _getBookedChairs(movieId, callBack) {

    const db = _openDb();
    let bookedChairs = [];

    let sql = `select seat from Booking
            where show = ?`;

    let promisifiedDbAll = utils.promisify(db.all.bind(db));
          
    promisifiedDbAll(sql, [movieId])
                .then(rows => {
                    rows.forEach((row) => {                       
                        bookedChairs.push(row.seat);
                    });
               
                    callBack(null, bookedChairs);
                }
                ).catch(err => {
                    callBack(err, bookedChairs);
                });
      

    _closeDb(db);
};

function createDb(){
                    
    const db = _openDb();
    db.serialize(function () {
        db.run("drop table if exists Halls");
        db.run("drop table if exists Seats");
        db.run("drop table if exists States");
        db.run("drop table if exists Shows");
        db.run("drop table if exists Booking");

        db.run("create table Halls (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)");
        db.run("create table Seats (id INTEGER PRIMARY KEY AUTOINCREMENT, id_hall int, row int, seat int)");         
        db.run("create table Shows (id INTEGER PRIMARY KEY AUTOINCREMENT, time datetime, movie text, hall int)");
        db.run("create table Booking (id INTEGER PRIMARY KEY AUTOINCREMENT, show int, seat int)");

        let stmt = db.prepare("insert into Halls (name) values (?) ");
        for (let i = 1; i < 4; i++) {                
                stmt.run(`Hall${i}`);
        }

        stmt.finalize();

        stmt = db.prepare("insert into Seats (id_hall, row, seat) values (?, ?, ?) ");           
        for (let hallId = 1; hallId < 4; hallId++) {
            for (let row = 1; row < 4; row++) {
                for (let seat = 1; seat < 5; seat++) {                           
                    stmt.run(hallId, row, seat);                           
                }
            }
        }
            
        stmt.finalize();
                    
        stmt = db.prepare("insert into Shows (time, movie, hall) values (?, ?, ?) ");
        stmt.run('2019-05-01 18:00:00', "La La Land", "1");
        stmt.run('2019-05-01 18:00:00', "The Hateful Eight", "2");
        stmt.run("2019-05-01 18:00:00", "Harry Potter and the Chamber of Secrets", "3");
        stmt.run("2019-05-02 18:00:00", "La La Land", "2");
        stmt.run("2019-05-02 18:00:00", "The Hateful Eight", "3");
        stmt.run("2019-05-02 18:00:00", "Harry Potter and the Chamber of Secrets", "1");
        stmt.run("2019-05-03 18:00:00", "La La Land", "3");
        stmt.run("2019-05-03 18:00:00", "The Hateful Eight", "1");
        stmt.run("2019-05-03 18:00:00", "Harry Potter and the Chamber of Secrets", "2");
        stmt.finalize();              
            
        console.log(`database is created`);
    });

    _closeDb(db);
}

function _openDb(){
    return new sqlite3.Database('../ValamisCinema.sqlite');
}

function _closeDb(db){
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
    });
}

const getTimeTable = utils.promisify(_getTimeTable.bind(this));
const getMovieChairs = utils.promisify(_getMovieChairs.bind(this));
const getBookedChairs = utils.promisify(_getBookedChairs.bind(this));
const bookChairs = utils.promisify(_bookChairs.bind(this));

exports.createDb = () => createDb();
exports.getTimeTable = () => getTimeTable();
exports.getMovieChairs = (movieId) => getMovieChairs(movieId);
exports.getBookedChairs = (movieId) => getBookedChairs(movieId);
exports.bookChairs = (movieId, seatIds) => bookChairs(movieId, seatIds);