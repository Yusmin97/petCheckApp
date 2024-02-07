// dbConnection.ts

import mysql, { Pool } from 'mysql2/promise';

let pool: Pool | null = null;

export function createConnection(): Pool {
    if (!pool) {
        console.error('Pool is not initialized. Creating a new pool...');
        pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: '1234',
            database: 'mypet',
        });
    } else {
        // pool이 이미 생성된 경우에는 end() 메서드를 호출하여 풀이 닫혔는지 확인합니다.
        pool.end().then(() => {
            console.error('Pool is closed. Reconnecting...');
            pool = mysql.createPool({
                host: 'localhost',
                user: 'root',
                password: '1234',
                database: 'mypet',
            });
        }).catch((err) => {
            console.error('Error checking pool status:', err);
        });
    }
    return pool;
}
