import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet'; // 외부에서 가져와야 합니다.

const router: Router = Router();

// 캘린더 일정 추가 API 엔드포인트
router.post('/add-schedule', async (req: Request, res: Response) => {
  const { title, description, start_date, end_date } = req.body;

  try {
    await mypetQuery('INSERT INTO calendar_schedule (title, description, start_date, end_date) VALUES (?, ?, ?, ?)', [
      title,
      description,
      start_date,
      end_date,
    ]);
    res.status(201).json({ message: '일정 추가가 성공적으로 완료되었습니다.' });
  } catch (error) {
    console.error('일정 추가 중 오류 발생:', error);
    res.status(500).json({ error: '일정 추가 중 오류가 발생했습니다.' });
  }
});

// 캘린더 일정 불러오기 API 엔드포인트
router.get('/get-schedules', async (req: Request, res: Response) => {
  const { user_id } = req.query; // 사용자 ID를 쿼리에서 가져옵니다.

  try {
    // 사용자 ID를 기반으로 해당 사용자의 일정을 가져옵니다.
    const schedules = await mypetQuery('SELECT * FROM calendar_schedule WHERE user_id = ?', [user_id]);
    res.status(200).json(schedules);
  } catch (error) {
    console.error('일정 불러오기 중 오류 발생:', error);
    res.status(500).json({ error: '일정 불러오기 중 오류가 발생했습니다.' });
  }
});

export default router;
