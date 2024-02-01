import React from 'react';
import { useNavigate } from 'react-router';
import "./FrontPage.css"

function FrontPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="container">
      <div className="cat_logo"></div>
      <div className="front_login">
        <button className="front_login_btn" onClick={handleLoginClick}>로그인</button>
      </div>
      <div className="join">
        <p className='joins_p'>계정 없을 시 |</p>
        <button className="join_btn" onClick={handleSignUpClick}>회원가입</button>
      </div>
    </div>
  );
}

export default FrontPage;
