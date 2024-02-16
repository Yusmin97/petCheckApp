import { Request, Response, Router } from 'express';
import mypetQuery from '../../src/database/myPet';

const router: Router = Router();

// 반려동물 정보 저장 API 엔드포인트
router.post('/pet-info', async (req: Request, res: Response) => {
  const {pet_name, pet_gender, pet_type, pet_neutered, pet_weight, pet_birth, pet_blood} = req.body;

  try {
    // 반려동물 정보를 데이터베이스에 저장
    await mypetQuery('INSERT INTO petinfo (pet_name, pet_gender, pet_type, pet_neutered, pet_weight, pet_birth, pet_blood) VALUES (?, ?, ?, ?, ?, ?, ?)', [
      pet_name,
      pet_gender,
      pet_type,
      pet_neutered,
      pet_weight,
      pet_birth,
      pet_blood,
    ]);

    res.status(201).json({ message: '반려동물 정보가 성공적으로 저장되었습니다.' });
  } catch (err) {
    console.error('반려동물 정보 저장 중 오류 발생:', err);
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// 이하 중복 아이디 체크 및 로그인 API 엔드포인트 등을 추가적으로 작성할 수 있습니다.

export default router;