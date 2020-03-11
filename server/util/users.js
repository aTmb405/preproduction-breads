let db = require("../models"),
    bcrypt = require('bcrypt');

// UPDATE, DELETE

exports.create = function(user) {  
    let salt = bcrypt.genSaltSync(10),
        hash = bcrypt.hashSync(user.password, salt);
        
    user.password = hash;
    let newUser = new Promise(function(resolve, reject) {
        db.connection.query("INSERT INTO users set ?", user, function (err, results) {
            if (err) reject(err);
            else resolve(results);
        });
    });
    return newUser;
}

exports.findByUsername = (username) => {
    let user = new Promise(function(resolve, reject) {
        db.connection.query("SELECT * FROM users WHERE username = ?", [username], function(err, results) {
            if (err) reject(err);
            else resolve(results);  
        });
    });
    return user;
}

// fix next
exports.delete = function(username, password) {
    db.connection.query("DELETE FROM users WHERE username = ? AND password = ?", [username, password], function(err, results) {
        if (err) throw err;
        else return this.values;
    });
}