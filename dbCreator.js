

    function createDb(){
            
        const sqlite3 = require('sqlite3').verbose();
        const db = new sqlite3.Database(':memory:');

        db.serialize(function () {
            db.run("create table Halls (id int, name text)");
            db.run("create table Seats (id int, id_hall int, row int, seat id)");
            db.run("create table States (id int, state text)");
            db.run("create table Shows (id int, time datetime, movie text, hall int)");
            db.run("create table Booking (id int, show id, seat id, state id)");

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

            db.close();

        });
    }

    exports.createDb = () => createDb();
