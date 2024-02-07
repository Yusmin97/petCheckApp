import express, { Request, Response, Router } from 'express';
import pool from '../../src/database/myPet';

const router: Router = express.Router();

// 회원가입 API 엔드포인트
router.post('/signup', async (req: Request, res: Response) => {
  const { user_id, user_pw, user_name } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.query('INSERT INTO users (user_id, user_pw, user_name) VALUES (?, ?, ?)', [user_id, user_pw, user_name]);
    conn.release();

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('Error occurred during signup:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 중복 아이디 체크 API 엔드포인트
router.post('/check-duplicate-id', async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const conn = await pool.getConnection();
    await conn.beginTransaction();

    // console.log('Executing query to check duplicate ID:', user_id);
    const [result] = await conn.query('SELECT user_id FROM users WHERE user_id = ?', [user_id]);
    console.log('Query result:', result);

    if (result && result.length > 0) {
      // 아이디가 중복되지 않음
      await conn.commit(); // 트랜잭션 커밋
      res.status(200).json({ isAvailable: true });
    } else {
      // 아이디가 이미 존재함
      await conn.rollback(); // 트랜잭션 롤백
      res.status(200).json({ isAvailable: false });
    }

    conn.release();
  } catch (error) {
    console.error('Error checking duplicate ID:', error);
    res.status(500).json({ error: '중복 아이디를 확인하는 중 오류가 발생했습니다.' });
  }
});

export default router;
