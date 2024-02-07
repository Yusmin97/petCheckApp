import { createConnection } from './dbConnection';
import { RowDataPacket } from 'mysql2';

export async function petQuery(sql: string, params: any): Promise<RowDataPacket[]> {
    try {
        const pool = createConnection();
        const [rows] = await pool.execute(sql, params);
        return rows as RowDataPacket[];
    } catch (error) {
        console.error('Error executing query:', error);
        throw error; // 에러를 호출자에게 전파
    }
}
