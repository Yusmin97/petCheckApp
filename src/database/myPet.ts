import mysql, { Pool, PoolConnection, PoolOptions } from 'mysql2/promise';

let pool: Pool;

// MySQL 연결 설정
const dbConfig: PoolOptions = {
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mypet',
};

// 풀 생성
function createPool(): Pool {
  return mysql.createPool(dbConfig);
}

// productQuery 함수 정의
async function mypetQuery(sql: string, params: any[]): Promise<any> {
  try {
    if (!pool) {
      pool = createPool();
    }

    // 쿼리 실행
    const connection: PoolConnection = await pool.getConnection();
    const [rows] = await connection.execute(sql, params);
    connection.release();
    return rows;
  } catch (error) {
    console.error('Error occurred during query:', error);
    throw error;
  }
}

export default mypetQuery;

