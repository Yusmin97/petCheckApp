import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import { petQuery } from './src/database/myPet';

const app: Express = express();
const port: number = 3001;

// Middleware 설정
app.use(bodyParser.json());
app.use(cors());

// 회원가입 API 엔드포인트
app.post('/signup', async (req: Request, res: Response) => {
  const { user_id, user_pw, user_name } = req.body;

  try {
    // 데이터베이스에 회원 정보 삽입
    const sql = `INSERT INTO users (user_id, user_pw, user_name) VALUES (?, ?, ?)`;
    await petQuery(sql, [user_id, user_pw, user_name]);

    console.log('User signed up successfully');
    res.status(200).json({ success: true, message: '회원가입에 성공했습니다.' });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false, message: '회원가입에 실패했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});