import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../authContext/authProvider';
import axios from 'axios';
import './Login.css';

interface LoginData {
  user_id: string;
  user_pw: string;
}

const LoginPage: React.FC = () => {
  const [userData, setUserData] = useState<LoginData>({
    user_id: '',
    user_pw: '',
  });
  
  const { setAuthState } = useAuth(); // 인증 상태 변경을 위해 useAuth 훅 사용

  const navigate = useNavigate();

  // 사용자가 값을 입력할 때마다 해당 입력 필드의 상태를 업데이트
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = () => {
    // 입력된 ID와 비밀번호를 서버로 전송하여 로그인 시도
    axios
      .post('http://localhost:3001/login', userData)
      .then((response) => {
        // 로그인 성공 시 필요한 작업 수행
        // 로그인 성공 시 전역 상태 업데이트
        setAuthState({ isLoggedIn: true, userId: userData.user_id });
        navigate('/main')
      })
      .catch((error) => {
        // 로그인 실패 시 에러 처리
        console.error('Error logging in:', error);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <div className="container">
      <div className="input_row1">
        <input
          type="text"
          className="id"
          placeholder="ID"
          name="user_id"
          value={userData.user_id}
          onChange={handleInputChange}
        />
      </div>
      <div className="input_row2">
        <input
          type="password"
          className="password"
          placeholder="Password"
          name="user_pw"
          value={userData.user_pw}
          onChange={handleInputChange}
        />
      </div>
      <div className="login">
        <button className="login_btn" onClick={handleLogin}>
          로그인
        </button>
      </div>
    </div>
  );
};

export default LoginPage;