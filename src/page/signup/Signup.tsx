import React from 'react';
import './Signup.css';

function SignUpPage() {
  return (
    <div className="container">
      <div className="signupLogo">회원가입</div>
      <div className="signupId">
        <input type="text" className="signupIdInput" placeholder="아이디"></input>
        <button className="duplicateId">중복체크</button>
        <div className="duplicateIdcheck"></div>
      </div>
      <div className="signupPassword">
        <input type="password" className="signupPasswordInput" placeholder="비밀번호"></input>
        <div className="duplicatePasswordcheck"></div>
      </div>
      <div className="signupPasswordCheck">
        <input type="password" className="signupPasswordInputCheck" placeholder="비밀번호 확인"></input>
      </div>
      <div className="signupEmail">
        <input type="text" className="signupEmailInput" placeholder="이메일"></input>
        <button className="duplicateEmail">중복체크</button>
        <div className="duplicateEmailcheck"></div>
      </div>
      <div className="signupPhone">
        <input type="number" className="signupPhoneInput" placeholder="전화번호"></input>
      </div>
      <div className="signupName">
        <input type="text" className="signupNameInput" placeholder="이름"></input>
      </div>
      <button className="signup_btn">회원가입</button>
    </div>
  );
}

export default SignUpPage;
