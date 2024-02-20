import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet';

const router: Router = Router();

// 반려동물 정보 저장 API 엔드포인트
router.post('/pet-info', async (req: Request, res: Response) => {
  const { pet_name, pet_gender, pet_type, pet_neutered, pet_weight, pet_birth, pet_blood, user_id } = req.body;

  try {
    // 클라이언트로부터 받은 user_id를 기반으로 user_num을 데이터베이스에서 검색
    const user = await mypetQuery('SELECT user_num FROM users WHERE user_id = ?', [user_id]);

    if (user.length > 0) {
      const user_num = user[0].user_num; // 검색된 사용자의 user_num 추출

      // 반려동물 정보를 데이터베이스에 저장
      await mypetQuery(
        'INSERT INTO petinfo (pet_name, pet_gender, pet_type, pet_neutered, pet_weight, pet_birth, pet_blood, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [pet_name, pet_gender, pet_type, pet_neutered, pet_weight, pet_birth, pet_blood, user_num]
      );

      res.status(201).json({ message: '반려동물 정보가 성공적으로 저장되었습니다.' });
    } else {
      // 사용자가 존재하지 않을 경우 에러 응답
      res.status(404).json({ error: '해당 사용자를 찾을 수 없습니다.' });
    }
  } catch (err) {
    console.error('반려동물 정보 저장 중 오류 발생:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 이하 중복 아이디 체크 및 로그인 API 엔드포인트 등을 추가적으로 작성할 수 있습니다.

export default router;
