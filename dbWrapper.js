const utils = require('./utils');
const sqlite3 = require("sqlite3").verbose();

function _wrapDbActions(dbActions) {
    const db = _openDb();
    const wrappedDDbActions = {
        dbAll: utils.promisify(db.all.bind(db)),
        dbGet: utils.promisify(db.get.bind(db)),
        dbRun: (sqlQuery) => db.run(sqlQuery),
        stmtPrepare: (sqlQuery) => { return db.prepare(sqlQuery) },
        stmtRun: (stmt, ...args) => stmt.run(args),
        stmtFinalize: (stmt) => stmt.finalize(),
        dbSerialize: (actions) => db.serialize(actions)
    };

    dbActions(wrappedDDbActions);
    _closeDb(db);
}


function _openDb() {
    return new sqlite3.Database('./ValamisCinema.sqlite');
}

function _closeDb(db) {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
    });
}


exports.wrapDbActions = (dbActions) => _wrapDbActions(dbActions);