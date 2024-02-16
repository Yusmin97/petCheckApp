import React, { useState } from 'react';
import { useAuth } from '../../authContext/authProvider';
import { useNavigate } from 'react-router';
import './Main.css';

function Main() {
  const navigate = useNavigate();

  // const [userName, setUserName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🧑');
  const [showButton, setShowButton] = useState(false);
  const { authState } = useAuth();

  // 사용자 프로필 아이콘 클릭 핸들러
  const handleProfileClick = () => {
    setShowButton(true); // 버튼을 보여줍니다.
  };

    // 아이콘 선택 핸들러
  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon); // 선택된 아이콘을 설정합니다.
    setShowButton(false); // 버튼을 숨깁니다.
  };

  console.log('전역 상태:', authState);

  const handleCalendarClick = () => {
    navigate('/calendar');
  }

  const handlePetInfoClick = () => {
    navigate('/petinfo');
  }

  return (
    <div className="container">
      <div className="userRender">
        <div className="userProfile" onClick={() => handleProfileClick()}>
          {/* 사용자 프로필 아이콘 */}
          {selectedIcon ? (
            <div className="selectedIcon" onClick={() => setShowButton(true)}>
              {selectedIcon}
            </div>
          ) : (
            <div className="noIcon">아이콘 선택</div>
          )}
        </div>
        {/* 버튼 영역 */}
        {showButton && (
          <div className="iconButtons">
            {/* 아이콘 선택 버튼 */}
            <button onClick={() => handleIconSelect('👩')} role="img" aria-label="Female">👩</button>
            <button onClick={() => handleIconSelect('🧑')} role="img" aria-label="Male">🧑</button>
            {/* 원하는 다른 아이콘들 추가 가능 */}
          </div>
        )}
      </div>
      <div className="petRender">
        <div className="plusPetBtn">
          <button className="plusBtn" onClick={handlePetInfoClick}>+</button>
        </div>
      </div>
      <div className="hospital_walk">
        <div className="hospital">
          <button className="hospitalBtn">🏥</button>
        </div>
        <div className="walk">
          <button className="walkBtn">🦮</button>
        </div>
      </div>
      <div className="mainCalendar">
        <button className='calendarBtn' onClick={handleCalendarClick}>📆</button>
      </div>
    </div>
  );
}

export default Main;
