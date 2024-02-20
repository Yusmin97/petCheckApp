import React, { useState, useEffect } from 'react';
import { useAuth } from '../../authContext/authProvider';
// import ReactEmoji from 'react-emoji-render';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Main.css';

interface Pet {
  pet_id: number;
  pet_name: string;
  pet_emoji: string;
}

function Main() {
  const navigate = useNavigate();

  const [selectedIcon, setSelectedIcon] = useState('🧑');
  const [showButton, setShowButton] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const { authState, setAuthState } = useAuth();

  useEffect(() => {
    // 로컬 스토리지에서 저장된 아이콘 불러오기
    const savedIcon = localStorage.getItem('selectedIcon');
    if (savedIcon) {
      setSelectedIcon(savedIcon);
    }
  }, []); // 컴포넌트가 처음 렌더링될 때만 실행

  useEffect(() => {
    // 사용자의 반려동물 정보를 가져오는 함수
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/get-petInfo?user_id=${authState.userId}`);
        setPets(response.data); // 서버에서 받아온 데이터로 상태 업데이트
      } catch (error) {
        console.error('Error fetching pets:', error);
      }
    };

    fetchPets(); // 함수 호출
  }, [authState.userId]); // authState.userId가 변경될 때마다 실행

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 인증 상태를 변경하여 로그아웃 처리
    setAuthState({ isLoggedIn: false, userId: null });
    // 로그인 페이지로 리디렉션
    navigate('/login');
  };

  // 사용자 프로필 아이콘 클릭 핸들러
  const handleProfileClick = () => {
    setShowButton(true); // 버튼을 보여줍니다.
  };

  // 아이콘 선택 핸들러
  const handleIconSelect = (icon: string) => {
    setSelectedIcon(icon); // 선택된 아이콘을 설정합니다.
    // 로컬 스토리지에 아이콘 저장
    localStorage.setItem('selectedIcon', icon);
    // 버튼을 숨깁니다.
    setShowButton(false);
  };

  console.log('전역 상태:', authState);

  const handleCalendarClick = () => {
    navigate('/calendar');
  };

  const handlePetInfoClick = () => {
    navigate('/petinfo');
  };

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
            <button onClick={() => handleIconSelect('👩')} role="img" aria-label="Female">
              👩
            </button>
            <button onClick={() => handleIconSelect('🧑')} role="img" aria-label="Male">
              🧑
            </button>
            {/* 원하는 다른 아이콘들 추가 가능 */}
          </div>
        )}
        {/* 사용자가 로그인되어 있을 때 보여지는 컴포넌트 */}
        {authState.isLoggedIn ? (
          <div className="userInfo">
            <h1 className="welcomeUser">{authState.userId}님 어서오세요!</h1>
            <button onClick={handleLogout}>Logout</button>
            {/* 이하 사용자가 로그인된 상태에서 보여지는 내용 */}
          </div>
        ) : (
          // 사용자가 로그인되어 있지 않을 때 보여지는 컴포넌트
          <div>
            <h1>Please log in</h1>
            {/* 로그인 페이지로 이동하는 링크 또는 버튼 등을 추가 */}
          </div>
        )}
      </div>
      <div className="petRender">
        <div className="plusPetBtn">
          <button className="plusBtn" onClick={handlePetInfoClick}>
            +
          </button>
        </div>
        <div>
          <ul>
            {pets.map((pet) => (
              <li className="petEmogiMain" key={pet.pet_id}>
                {pet.pet_emoji && String.fromCodePoint(parseInt(pet.pet_emoji.replace('U+', ''), 16))}
              </li>
            ))}
          </ul>
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
        <button className="calendarBtn" onClick={handleCalendarClick}>
          📆
        </button>
      </div>
    </div>
  );
}

export default Main;
