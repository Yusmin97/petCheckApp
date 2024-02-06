import React from 'react';
import Calendar from '../calender/Calendar';
import './Main.css';

function Main() {
  return (
    <div className="container">
      <div className="userRender">
        <div className="userProfile"></div>
      </div>
      <div className="petRender">
        <div className="plusPetBtn">
          <button className="plusBtn">
            +
          </button>
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
