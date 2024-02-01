import React from 'react';
import "./FrontPage.css"

function FrontPage() {
  return (
    <div className="container">
      <div className="cat_logo"></div>
      <div className="front_login">
        <button className="front_login_btn">로그인</button>
      </div>
      <div className="join">
        <button className="join_btn">계정 없을 시 | 회원가입</button>
      </div>
    </div>
  );
}

export default FrontPage;
