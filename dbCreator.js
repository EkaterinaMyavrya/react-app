const utils = require('./utils');
const sqlite3 = require("sqlite3").verbose();

function _getTimeTable(callBack) {    
       
    const db = new sqlite3.Database('../ValamisCinema.sqlite');
    let timeTable = [];
        
    db.serialize(function () {            
            const sql =
                "select Shows.id as id, Shows.time as time, Shows.movie as movie, " +
                "Halls.name as hall, Halls.id as hallId from Shows " +
                "join Halls on Halls.id = Shows.hall " +
                "order by Shows.id ";
            console.log('inside db serialize');

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
                callBack(err, timeTable);});          
    });             
        
    db.close();        
};

const getTimeTable = utils.promisify(_getTimeTable.bind(this));

function createDb(){
                    
    let db = new sqlite3.Database('../ValamisCinema.sqlite');

        db.serialize(function () {
            db.run("drop table if exists Halls");
            db.run("drop table if exists Seats");
            db.run("drop table if exists States");
            db.run("drop table if exists Shows");
            db.run("drop table if exists Booking");

            db.run("create table Halls (id int, name text)");
            db.run("create table Seats (id int, id_hall int, row int, seat id)");
            db.run("create table States (id int, state text)");
            db.run("create table Shows (id int, time datetime, movie text, hall int)");
            db.run("create table Booking (id int, show id, seat id, state id)");

            let stmt = db.prepare("insert into Halls values (?, ?)");
            for (let i = 1; i < 4; i++) {
                console.log(`insert Hall${i}`);
                stmt.run(i, `Hall${i}`);
            }

            stmt.finalize();

            stmt = db.prepare("insert into Seats values (?, ?, ?, ?)");
            let i = 1;
                for (let hallId = 1; hallId < 4; hallId++) {
                    for (let row = 1; row < 4; row++) {
                        for (let seat = 1; seat < 5; seat++) {
                            console.log(
                                `insert Seats ${i}, ${hallId}, ${row}, ${seat}`
                            );
                            stmt.run(i, hallId, row, seat);
                            i++;
                        }
                    }
                }
            
            stmt.finalize();

            stmt = db.prepare("insert into States values (?, ?)");
            stmt.run(1, "free");
            stmt.run(2, "booked");
            stmt.run(3, "payed");
            stmt.finalize();
            console.log(
                `inserted states`
            );
          
            stmt = db.prepare("insert into Shows values (?, ?, ?, ?)");
            stmt.run(1, '2019-01-01 18:00:00', "La La Land", "1");
            stmt.run(2, '2019-01-01 18:00:00', "The Hateful Eight", "2");
            stmt.run(3, "2019-01-01 18:00:00", "Harry Potter and the Chamber of Secrets", "3");
            stmt.run(4, "2019-01-02 18:00:00", "La La Land", "2");
            stmt.run(5, "2019-01-02 18:00:00", "The Hateful Eight", "3");
            stmt.run(6, "2019-01-02 18:00:00", "Harry Potter and the Chamber of Secrets", "1");
            stmt.run(7, "2019-01-03 18:00:00", "La La Land", "3");
            stmt.run(8, "2019-01-03 18:00:00", "The Hateful Eight", "1");
            stmt.run(9, "2019-01-03 18:00:00", "Harry Potter and the Chamber of Secrets", "2");
            stmt.finalize();
            console.log(
                `inserted shows`
            );

          
        });

    db.close();

}

exports.createDb = () => createDb();
exports.getTimeTable = () => getTimeTable();
    
