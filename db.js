const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({ path: './.env'})

const pool = mysql.createPool({
    host: process.env.DB_host,
    user: process.env.DB_user,
    password: process.env.DB_password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// To get a connection from the pool:
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection from pool:', err);
        return;
    }
    // Use the connection for database operations
    connection.query('SELECT 1 + 1 AS solution', (error, results) => {
        // Handle the result
        console.log('Mysql Connected..', results[0].solution);
        // Release the connection back to the pool
        connection.release();
    });
});
module.exports = {connection : pool}