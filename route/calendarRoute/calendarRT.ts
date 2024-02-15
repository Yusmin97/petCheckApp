import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet';

const router: Router = Router();

// 캘리더 이벤트 추가 API 엔드포인트
router.post('/add-event', async (req: Request, res: Response) => {
  const { title, description, start_date, end_date, location } = req.body;

  try {
    // 쿼리 실행
    await mypetQuery('INSERT INTO events (title, description, start_date, end_date, location) VALUES (?, ?, ?, ?, ?)', [
      title,
      description,
      start_date,
      end_date,
      location
    ]);

    res.status(201).json({ message: '일정 추가가 성공적으로 완료되었습니다.' });
  } catch (err) {
    console.error('일정 추가 중 오류 발생:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 캘린더 이벤트 가져오기 API 엔드포인트
router.get('/get-events', async (req: Request, res: Response) => {
  
  try {
    const events = await mypetQuery('SELECT * FROM events');
    res.status(200).json(events);
  } catch (error) {
    console.error('이벤트 가져오기 중 오류 발생:', error);
    res.status(500).json({ error: '이벤트를 가져오는 중 오류가 발생했습니다.' });
  }
});

export default router;