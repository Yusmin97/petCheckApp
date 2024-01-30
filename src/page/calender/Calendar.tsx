import React, { useState } from 'react';
import "./Calendar.css"

function Calendar() {
  const [date, setDate] = useState(new Date());

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];

  // useState에 현재 선택된 날짜를 추가합니다.
const [selectedDate, setSelectedDate] = useState(new Date());

const nextMonth = () => {
  setDate(prevDate => {
    const nextMonthDate = new Date(prevDate);
    // 현재 월을 증가시키고, 날짜를 1일로 설정하여 다음 달의 첫째 날로 이동합니다.
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1, 1);
    return nextMonthDate;
  });
  // 다음 달로 이동할 때마다 선택된 날짜를 해당 달의 첫째 날로 설정합니다.
  setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

const prevMonth = () => {
  setDate(prevDate => {
    const prevMonthDate = new Date(prevDate);
    // 현재 월을 감소시키고, 날짜를 1일로 설정하여 이전 달의 첫째 날로 이동합니다.
    prevMonthDate.setMonth(prevMonthDate.getMonth() - 1, 1);
    return prevMonthDate;
  });
  // 이전 달로 이동할 때마다 선택된 날짜를 해당 달의 첫째 날로 설정합니다.
  setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
};

  const renderDaysOfWeek = () => {
    return days.map(day => (
      <th key={day} className="day">{day}</th>
    ));
  };

// 이전 코드는 유지합니다.

const renderCalendar = () => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const blanks = Array(startingDayOfWeek).fill(0);
  const daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);
  const daysInNextMonth = Array.from({ length: 6 * 7 - (daysInMonth.length + startingDayOfWeek) }, (_, i) => i + 1);

  let dayCount = 1;

  return Array(6).fill(0).map((_, weekIndex) => (
    <tr key={weekIndex}>
      {days.map((day, dayIndex) => {
        if (weekIndex === 0 && dayIndex < startingDayOfWeek) {
          return <td key={`${weekIndex}-${dayIndex}`} className="not-current-month">{blanks[dayIndex]}</td>;
        } else if (dayCount > lastDayOfMonth.getDate()) {
          return <td key={`${weekIndex}-${dayIndex}`} className="not-current-month">{daysInNextMonth.shift()}</td>;
        } else {
          const classNames = (dayCount === selectedDate.getDate() && date.getMonth() === firstDayOfMonth.getMonth()) ? 'current-day' : '';
          return <td key={`${weekIndex}-${dayIndex}`} className={classNames}>{dayCount++}</td>;
        }
      })}
    </tr>
  ));
};



  return (
    <div className="calendar-container">
      <div className="header">
        <button onClick={prevMonth}>&lt;</button>
        <div>{monthNames[date.getMonth()]} {date.getFullYear()}</div>
        <button onClick={nextMonth}>&gt;</button>
      </div>
      <table className="calendar">
        <thead>
          <tr>{renderDaysOfWeek()}</tr>
        </thead>
        <tbody>{renderCalendar()}</tbody>
      </table>
    </div>
  );
}

export default Calendar;


