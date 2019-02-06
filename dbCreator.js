
const sqlite3 = require("sqlite3").verbose();

    function getTimeTable(onSuccessCallback) {    
       
        const db = new sqlite3.Database('../ValamisCinema.sqlite');

        let timeTable = [];
        
        db.serialize(function () {            
            const sql = "select time, movie, hall from Shows";
            console.log('inside db serialize');

            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }

                rows.forEach((row) => {
                    console.log(
                        `date: ${row.time} movie: ${row.movie} hall: ${row.hall}`
                    );
                    timeTable.push({
                        datetime: row.time,
                        movie: row.movie,
                        hall: row.hall
                    })
                });

                onSuccessCallback(timeTable);
            });
        });      
        
        db.close();        
    }

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
    exports.getTimeTable = (callback) => getTimeTable(callback);
    
