
const sqlite3 = require("sqlite3").verbose();

    function getTimeTable() {    
       
        let db = new sqlite3.Database('ValamisCinema.sqlite');

        let timeTable = [];

        db.serialize(function () {            
            const sql = "select datetime, movie, hall from Shows";
           

            db.all(sql, [], (err, rows) => {
                if (err) {
                    throw err;
                }

                rows.forEach((row) => {
                    timeTable.push({
                        datetime: row.datetime,
                        movie: row.movie,
                        hall: row.hall
                    })
                });
            });

            db.close();
        });

        return timeTable;
    }

    function createDb(){
                    
        let db = new sqlite3.Database('ValamisCinema.sqlite');

        db.serialize(function () {
            db.run("create table IF NOT EXISTS Halls (id int, name text)");
            db.run("create table IF NOT EXISTS Seats (id int, id_hall int, row int, seat id)");
            db.run("create table IF NOT EXISTS States (id int, state text)");
            db.run("create table IF NOT EXISTS Shows (id int, time datetime, movie text, hall int)");
            db.run("create table IF NOT EXISTS Booking (id int, show id, seat id, state id)");

            let stmt = db.prepare("insert into Halls values (?, ?)");
            for (let i = 1; i < 4; i++) {
                stmt.run(i, `Hall${i}`);
            }

            stmt.finalize();

            stmt = db.prepare("insert into Seats values (?, ?, ?, ?)");
            for (let id = 1; id < 106; id++) {
                for (let hallId = 1; hallId < 4; hallId++) {
                    for (let row = 1; row < 6; row++) {
                        for (let seat = 1; seat < 8; seat++) {
                            stmt.run(id, hallId, row, seat);
                        }
                    }
                }
            }

            stmt.finalize();

            stmt = db.prepare("insert into States values (?, ?)");
            stmt.run(1, "free");
            stmt.run(2, "booked");
            stmt.run(3, "payed");
            stmt.finalize();

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

          
        });

        db.close();

    }

    exports.createDb = () => createDb();
    exports.getTimeTable = () => getTimeTable();
    
