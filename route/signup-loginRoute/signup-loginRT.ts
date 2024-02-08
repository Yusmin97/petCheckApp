import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet';
import { hashPassword, comparePasswords } from './hashPassword';

const router: Router = Router();

// 회원가입 API 엔드포인트
router.post('/signup', async (req: Request, res: Response) => {
  const { user_id, user_pw, user_name } = req.body;

  try {
    // 비밀번호를 해싱합니다.
    const hashedPassword = await hashPassword(user_pw);

    // 쿼리 실행
    await mypetQuery('INSERT INTO users (user_id, user_pw, user_name) VALUES (?, ?, ?)', [
      user_id,
      hashedPassword,
      user_name,
    ]);

    res.status(201).json({ message: '회원가입이 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('회원가입 중 오류 발생:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 중복 아이디 체크 API 엔드포인트
router.post('/check-duplicate-id', async (req: Request, res: Response) => {
  const { user_id } = req.body;

  try {
    const result = await mypetQuery('SELECT user_id FROM users WHERE user_id = ?', [user_id]);

    if (result.length > 0) {
      res.status(200).json({ isAvailable: true });
    } else {
      res.status(200).json({ isAvailable: false });
    }
  } catch (error) {
    console.error('중복 아이디 확인 중 오류 발생:', error);
    res.status(500).json({ error: '중복 아이디를 확인하는 중 오류가 발생했습니다.' });
  }
});

// 로그인 API 엔드포인트
router.post('/login', async (req: Request, res: Response) => {
  const { user_id, user_pw } = req.body;

  try {
    const user = await mypetQuery('SELECT * FROM users WHERE user_id = ?', [user_id]);

    if (user.length > 0) {
      const storedUserPw = user[0].user_pw;

      // 비밀번호 검증
      const isPasswordMatch = await comparePasswords(user_pw, storedUserPw);

      if (isPasswordMatch) {
        res.status(200).json({ message: '로그인 성공!' });
      } else {
        res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
      }
    } else {
      res.status(401).json({ message: '아이디 또는 비밀번호가 올바르지 않습니다.' });
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    res.status(500).json({ error: '로그인 중 오류가 발생했습니다.' });
  }
});

export default router;
