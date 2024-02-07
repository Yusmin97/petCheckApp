import mariadb from 'mariadb';

// MariaDB 연결 설정
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mypet',
});

export default pool;
