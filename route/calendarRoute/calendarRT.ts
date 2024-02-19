import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet'; // 외부에서 가져와야 합니다.

const router: Router = Router();

// 서버에서 일정을 추가하는 API 엔드포인트
router.post('/add-schedule', async (req: Request, res: Response) => {
  const { title, description, start_date, end_date, user_id } = req.body;

  try {
    // 클라이언트로부터 받은 user_id를 기반으로 user_num을 데이터베이스에서 검색
    const user = await mypetQuery('SELECT user_num FROM users WHERE user_id = ?', [user_id]);

    if (user.length > 0) {
      const user_num = user[0].user_num; // 검색된 사용자의 user_num 추출

      // 검색된 user_num과 함께 일정을 추가하는 쿼리 실행
      await mypetQuery('INSERT INTO calendar_schedule (title, description, start_date, end_date, user_id) VALUES (?, ?, ?, ?, ?)', [
        title,
        description,
        start_date,
        end_date,
        user_num, // 검색된 user_num 사용
      ]);

      res.status(201).json({ message: '일정 추가가 성공적으로 완료되었습니다.' });
    } else {
      // 사용자가 존재하지 않을 경우 에러 응답
      res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
    }
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
