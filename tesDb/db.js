import mysql from 'mysql2/promise';

// const pool = mysql.createPool({
//   host: 'localhost', 
//   user: 'root', 
//   password: 'password', 
//   database: 'test1', 
// });

const pool = mysql.createPool({
  host: '192.168.100.15', 
  user: 'radho', 
  password: 'radho', 
  database: 'test1', 
});

export default pool;
