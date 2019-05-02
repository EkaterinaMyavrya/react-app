exports.SELECT_SHOWS_WITH_HALLS = `select Shows.id as id, Shows.time as time, Shows.movie as movie, 
   Halls.name as hall, Halls.id as hallId 
   from Shows 
   join Halls on Halls.id = Shows.hall 
   order by Shows.id `;

exports.SELECT_HALL_FOR_SHOW = `select hall from Shows where Shows.id = ?`;

exports.SELECT_SEATS_FOR_HALL = `select Seats.id as seatId, Seats.row as row, Seats.seat as seat 
                from Seats
                where Seats.id_hall = ?
                order by Seats.id `;
exports.SELECT_BOOKED_SEATS_FOR_SHOW = `select seat from Booking where show = ?`;

exports.INSERT_INTO_BOOKING = `insert into Booking (show, seat) values (?,?)`;
exports.INSERT_INTO_HALLS = "insert into Halls (name) values (?) ";
exports.INSERT_INTO_SEATS =
    "insert into Seats (id_hall, row, seat) values (?, ?, ?) ";
exports.INSERT_INTO_SHOWS =
    "insert into Shows (time, movie, hall) values (?, ?, ?) ";

exports.DROP_HALLS_IF_EXISTS = "drop table if exists Halls";
exports.DROP_SEATS_IF_EXISTS = "drop table if exists Seats";
exports.DROP_SHOWS_IF_EXISTS = "drop table if exists Shows";
exports.DROP_BOOKING_IF_EXISTS = "drop table if exists Booking";

exports.CREATE_HALLS_TABLE =
    "create table Halls (id INTEGER PRIMARY KEY AUTOINCREMENT, name text)";
exports.CREATE_SEATS_TABLE =
    "create table Seats (id INTEGER PRIMARY KEY AUTOINCREMENT, id_hall int, row int, seat int)";
exports.CREATE_SHOWS_TABLE =
    "create table Shows (id INTEGER PRIMARY KEY AUTOINCREMENT, time datetime, movie text, hall int)";
exports.CREATE_BOOKING_TABLE =
    "create table Booking (id INTEGER PRIMARY KEY AUTOINCREMENT, show int, seat int)";
