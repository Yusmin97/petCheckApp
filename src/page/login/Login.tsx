import React from 'react';
import './Login.css';

function LoginPage() {
  return (
    <div className="container">
      <div className="input_row1">
        <input type="text" className="id" placeholder="ID"></input>
      </div>
      <div className="input_row2">
        <input type="password" className="password" placeholder="Password"></input>
      </div>
      <div className="login">
        <button className="login_btn">로그인</button>
      </div>
    </div>
  );
}

export default LoginPage;
