import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="cat_logo"></div>
        <div className="login">
          <button className="login_btn">로그인</button>
        </div>
        <div className="join">
          <p className='join_p'>계정 없을 시 |</p>
          <button className='join_btn'>회원가입</button>
        </div>        
      </div>
    </div>
  );
}

export default App;
