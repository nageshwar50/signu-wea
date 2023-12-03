const mysql = require('mysql');
const dotenv = require('dotenv');


dotenv.config({ path: './.env'})

const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'nageshwar',
    password: 'DtnPkAlpxWTC9CkE:',
    database: 'NAGESHWAR',
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