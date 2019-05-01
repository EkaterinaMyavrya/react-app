const utils = require('./utils');
const sqlQueries = require('./sqlQueries');
const dbWrapper = require('./dbWrapper');

function _getTimeTable(callBack) {    
    dbWrapper.wrapDbActions((wrappedDDbActions) => {
        let timeTable = [];   
        wrappedDDbActions.dbAll(sqlQueries.SELECT_SHOWS_WITH_HALLS, [])
            .then(rows => {
                rows.forEach((row) => {                 
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
    });    
};


function _getMovieChairs(movieId, callBack) {
    dbWrapper.wrapDbActions((wrappedDDbActions) => {   
        wrappedDDbActions.dbGet(sqlQueries.SELECT_HALL_FOR_SHOW, [movieId])
            .then(row => {                
                _promisifiedSelectSeatsForHall(row.hall, movieId)
                    .then(movieChairs => callBack(null, movieChairs))
                    .catch(err => callBack(err, []));
                })  
            .catch(err => callBack(err, []));     
        });
};

function _selectSeatsForHall(idHall, movieId, callBack){
    dbWrapper.wrapDbActions((wrappedDDbActions) => {
        let movieChairs = [];
        wrappedDDbActions.dbAll(sqlQueries.SELECT_SEATS_FOR_HALL, [idHall])
        .then(rows => {
            rows.forEach((row) => {
                movieChairs.push({
                    id: row.seatId,
                    row: row.row,
                    seat: row.seat,
                    state: "free"
                });
            });

            _promisifiedGetBookedChairs(movieId).then(
                seatsIds => {
                    seatsIds.forEach(seatId => {
                        movieChairs.find(chair => chair.id == seatId).state = "booked";
                    });

                    callBack(null, movieChairs);
                }
            ).catch(err => callBack(err, []))
        }).catch(err => callBack(err, []));
    });
}

function _bookChairs(movieId, seatIds, callBack) {   
    dbWrapper.wrapDbActions((wrappedDDbActions) => {
        try {
            if (seatIds && Array.isArray(seatIds)){
                let stmt = wrappedDDbActions.stmtPrepare(sqlQueries.INSERT_INTO_BOOKING);
                seatIds.forEach((seatId) => {           
                    wrappedDDbActions.stmtRun(stmt, movieId, seatId);
                });
                wrappedDDbActions.stmtFinalize(stmt);
            }
        }catch (err) {
            callBack(err, null);
        }
        
        callBack(null, "success");
    });   
}


function _getBookedChairs(movieId, callBack) {
    dbWrapper.wrapDbActions((wrappedDDbActions) => {                          
        wrappedDDbActions.dbAll(sqlQueries.SELECT_BOOKED_SEATS_FOR_SHOW, [movieId])
                    .then(rows => {
                        let bookedChairs = [];   

                        rows.forEach((row) => {                       
                            bookedChairs.push(row.seat);
                        });
                
                        callBack(null, bookedChairs);
                    }
                    ).catch(err => {
                        callBack(err, []);
                    });
    });            
}

function _createDb(){                    
    dbWrapper.wrapDbActions((wrappedDDbActions) => {
        wrappedDDbActions.dbSerialize( () => {
            
            wrappedDDbActions.dbRun(sqlQueries.DROP_HALLS_IF_EXISTS);          
            wrappedDDbActions.dbRun(sqlQueries.DROP_SEATS_IF_EXISTS);
            wrappedDDbActions.dbRun(sqlQueries.DROP_SHOWS_IF_EXISTS);
            wrappedDDbActions.dbRun(sqlQueries.DROP_BOOKING_IF_EXISTS);
       
            wrappedDDbActions.dbRun(sqlQueries.CREATE_BOOKING_TABLE);
            wrappedDDbActions.dbRun(sqlQueries.CREATE_HALLS_TABLE);         
            wrappedDDbActions.dbRun(sqlQueries.CREATE_SEATS_TABLE);
            wrappedDDbActions.dbRun(sqlQueries.CREATE_SHOWS_TABLE);

            let stmt = wrappedDDbActions.stmtPrepare(sqlQueries.INSERT_INTO_HALLS);
            for (let i = 1; i < 4; i++) {                
                wrappedDDbActions.stmtRun(stmt, `Hall${i}`);
            }

            wrappedDDbActions.stmtFinalize(stmt);



            stmt = wrappedDDbActions.stmtPrepare(sqlQueries.INSERT_INTO_SEATS);           
            for (let hallId = 1; hallId < 4; hallId++) {
                for (let row = 1; row < 6; row++) {
                    for (let seat = 1; seat < 11; seat++) {                           
                        wrappedDDbActions.stmtRun(stmt, hallId, row, seat);                           
                    }
                }
            }
                
            wrappedDDbActions.stmtFinalize(stmt);
                    
            stmt = wrappedDDbActions.stmtPrepare(sqlQueries.INSERT_INTO_SHOWS);
            wrappedDDbActions.stmtRun(stmt, '2019-05-01 18:00:00', "La La Land", "1");
            wrappedDDbActions.stmtRun(stmt, '2019-05-01 18:00:00', "The Hateful Eight", "2");
            wrappedDDbActions.stmtRun(stmt, "2019-05-01 18:00:00", "Harry Potter and the Chamber of Secrets", "3");
            wrappedDDbActions.stmtRun(stmt, "2019-05-02 18:00:00", "La La Land", "2");
            wrappedDDbActions.stmtRun(stmt, "2019-05-02 18:00:00", "The Hateful Eight", "3");
            wrappedDDbActions.stmtRun(stmt, "2019-05-02 18:00:00", "Harry Potter and the Chamber of Secrets", "1");
            wrappedDDbActions.stmtRun(stmt, "2019-05-03 18:00:00", "La La Land", "3");
            wrappedDDbActions.stmtRun(stmt, "2019-05-03 18:00:00", "The Hateful Eight", "1");
            wrappedDDbActions.stmtRun(stmt, "2019-05-03 18:00:00", "Harry Potter and the Chamber of Secrets", "2");
            wrappedDDbActions.stmtFinalize(stmt);             
                
            console.log(`Valamis cinema database has been created.`);
        });
   });
}



const _promisifiedGetBookedChairs = utils.promisify(_getBookedChairs.bind(this));
const _promisifiedSelectSeatsForHall = utils.promisify(_selectSeatsForHall.bind(this));

const getTimeTable = utils.promisify(_getTimeTable.bind(this));
const getMovieChairs = utils.promisify(_getMovieChairs.bind(this));
const bookChairs = utils.promisify(_bookChairs.bind(this));

exports.createDb = () => _createDb();
exports.getTimeTable = () => getTimeTable();
exports.getMovieChairs = (movieId) => getMovieChairs(movieId);
exports.bookChairs = (movieId, seatIds) => bookChairs(movieId, seatIds);