import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

interface SignUpData {
  user_id: string;
  user_pw: string;
  user_pw_check: string;
  user_name: string;
}

const SignUpPage: React.FC = () => {
  const [userData, setUserData] = useState<SignUpData>({
    user_id: '',
    user_pw: '',
    user_pw_check: '',
    user_name: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSignUp = () => {
    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (userData.user_pw !== userData.user_pw_check) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 API 호출
    axios
      .post('/signup', userData)
      .then((response) => {
        alert(response.data.message);
        // 회원가입 성공 시 필요한 작업 수행
      })
      .catch((error) => {
        console.error('Error signing up', error);
        alert('회원가입에 실패했습니다.');
      });
  };

  return (
    <div className="container">
      <div className="signupLogo">회원가입</div>
      <div className="signupId">
        <input
          type="text"
          className="signupIdInput"
          placeholder="아이디"
          name="user_id"
          value={userData.user_id}
          onChange={handleInputChange}
        />
        <button className="duplicateId">중복체크</button>
        <div className="duplicateIdcheck"></div>
      </div>
      <div className="signupPassword">
        <input
          type="password"
          className="signupPasswordInput"
          placeholder="비밀번호"
          name="user_pw"
          value={userData.user_pw}
          onChange={handleInputChange}
        />
        <div className="duplicatePasswordcheck"></div>
      </div>
      <div className="signupPasswordCheck">
        <input
          type="password"
          className="signupPasswordInputCheck"
          placeholder="비밀번호 확인"
          name="user_pw_check"
          value={userData.user_pw_check}
          onChange={handleInputChange}
        />
      </div>
      <div className="signupName">
        <input
          type="text"
          className="signupNameInput"
          placeholder="이름"
          name="user_name"
          value={userData.user_name}
          onChange={handleInputChange}
        />
      </div>
      <button className="signup_btn" onClick={handleSignUp}>회원가입</button>
    </div>
  );
};

export default SignUpPage;
