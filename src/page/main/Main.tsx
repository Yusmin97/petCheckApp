import React, { useState, useEffect } from 'react';
import Calendar from '../calender/Calendar';
import { useAuth } from '../../authContext/authProvider';
import './Main.css';

function Main() {
  // const [userName, setUserName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('🧑');
  const [showButton, setShowButton] = useState(false);
  const { authState } = useAuth();

  // 사용자 이름 가져오기
  // useEffect(() => {
  //   // 사용자 이름을 가져오는 로직을 구현해야 합니다.
  //   // 예를 들어, 서버에서 사용자 정보를 가져와야 합니다.
  //   // 이 예제에서는 로컬 스토리지에서 가져오는 것으로 가정합니다.
  //   const storedUserName = localStorage.getItem('user_name');
  //   if (storedUserName) {
  //     setUserName(storedUserName);
  //   }
  // }, []);

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
          <button className="plusBtn">+</button>
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
        <Calendar size="85vw 35vh" />
      </div>
    </div>
  );
}

export default Main;
