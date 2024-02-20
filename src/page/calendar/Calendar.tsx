/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import axios from 'axios';
import { useAuth } from '../../authContext/authProvider';
import Modal from './Modal';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

interface Schedule {
  title: string;
  start_date: Date;
  end_date: Date;
}

function Calendar() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { authState } = useAuth();

  console.log('전역 상태:', authState);

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const monthNames = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/get-schedules?user_id=${authState.userId}`);
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules: ', error);
    }
  };

  const nextMonth = () => {
    setDate((prevDate) => {
      const nextMonthDate = new Date(prevDate);
      // 현재 월을 증가시키고, 날짜를 1일로 설정하여 다음 달의 첫째 날로 이동합니다.
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1, 1);
      return nextMonthDate;
    });
    // 다음 달로 이동할 때마다 선택된 날짜를 해당 달의 첫째 날로 설정합니다.
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const prevMonth = () => {
    setDate((prevDate) => {
      const prevMonthDate = new Date(prevDate);
      // 현재 월을 감소시키고, 날짜를 1일로 설정하여 이전 달의 첫째 날로 이동합니다.
      prevMonthDate.setMonth(prevMonthDate.getMonth() - 1, 1);
      return prevMonthDate;
    });
    // 이전 달로 이동할 때마다 선택된 날짜를 해당 달의 첫째 날로 설정합니다.
    setSelectedDate(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  const handleYearsMonthClick = () => {
    setShowDatePicker(true);
  };

  const handleDatePickerChange = (selectedDate: any) => {
    setDate(selectedDate);
    setShowDatePicker(false); // DatePicker를 닫습니다.
    setSelectedDate(selectedDate);
  };

  const handleDayClick = (day: any) => {
    setSelectedDate(day);
    setShowModal(true); // 모달 표시
  };

  const goToToday = () => {
    setDate(new Date()); // 오늘의 날짜로 이동합니다.
    setSelectedDate(new Date()); // 선택된 날짜도 오늘의 날짜로 설정합니다.
  };

  const renderDaysOfWeek = () => {
    return days.map((day) => (
      <th key={day} className="day">
        {day}
      </th>
    ));
  };

  const renderCalendar = () => {
    // 현재 날짜를 가져옵니다.
    const today = new Date();

    const isDateSelected = (currentDay: any) => {
      return (
        currentDay.getDate() === selectedDate.getDate() &&
        currentDay.getMonth() === selectedDate.getMonth() &&
        currentDay.getFullYear() === selectedDate.getFullYear()
      );
    };

    // 해당 월의 첫째 날과 마지막 날을 구합니다.
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // 해당 월의 첫째 날의 요일을 구합니다.
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // 이전 달의 마지막 일을 구합니다.
    const lastDayOfPrevMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    const lastDayPrevMonth = lastDayOfPrevMonth.getDate();

    // 이전 달의 일 수를 채우기 위한 배열을 생성합니다.
    const blanks = Array.from({ length: startingDayOfWeek }, (_, i) => lastDayPrevMonth - startingDayOfWeek + i + 1);

    // 해당 월의 날짜 배열을 생성합니다.
    const daysInMonth = Array.from({ length: lastDayOfMonth.getDate() }, (_, i) => i + 1);

    // 다음 달의 일 수를 채우기 위한 배열을 생성합니다.
    const daysInNextMonth = Array.from({ length: 6 * 7 - (daysInMonth.length + startingDayOfWeek) }, (_, i) => i + 1);

    let dayCount = 1;

    // 해당 월의 첫째 주부터 6주까지를 반복하여 테이블의 행을 생성합니다.
    return Array(6)
      .fill(0)
      .map((_, weekIndex) => (
        <tr key={weekIndex}>
          {days.map((day, dayIndex) => {
            // 첫째 주이고, 현재 요일이 해당 월의 시작 요일 이전인 경우, 이전 달의 일 수를 표시합니다.
            if (weekIndex === 0 && dayIndex < startingDayOfWeek) {
              return (
                <td key={`${weekIndex}-${dayIndex}`} className="not-current-month">
                  {blanks[dayIndex]}
                </td>
              );
            }
            // 해당 월의 일 수를 모두 표시한 경우, 다음 달의 일 수를 표시합니다.
            else if (dayCount > lastDayOfMonth.getDate()) {
              return (
                <td key={`${weekIndex}-${dayIndex}`} className="not-current-month">
                  {daysInNextMonth.shift()}
                </td>
              );
            }
            // 해당 월의 일 수를 표시합니다.
            else {
              // 선택된 날짜가 오늘인지 확인합니다.
              const currentDay = new Date(date.getFullYear(), date.getMonth(), dayCount);
              const isToday =
                currentDay.getDate() === today.getDate() &&
                currentDay.getMonth() === today.getMonth() &&
                currentDay.getFullYear() === today.getFullYear();
              const isSelected = isDateSelected(currentDay);
              const classNames = isToday ? 'current-day' : isSelected ? 'selected-date' : '';
              // 해당 날짜에 대한 일정을 가져옵니다.
              const schedulesForDate = getSchedulesForDate(currentDay);
              dayCount++;
              return (
                <td key={`${weekIndex}-${dayIndex}`} className={classNames} onClick={() => handleDayClick(currentDay)}>
                  <div className="cell-content">
                    <div className="date">{currentDay.getDate()}</div>
                  </div>
                  {schedulesForDate.map((schedule, index) => (
                    <div key={index} className="schedule">
                      {schedule.title}
                    </div>
                  ))}
                </td>
              );
            }
          })}
        </tr>
      ));
  };

  // 각 날짜에 대한 일정 목록을 가져오는 함수
  const getSchedulesForDate = (currentDay: Date) => {
    return schedules.filter((schedule) => {
      const scheduleDate = new Date(schedule.start_date);
      return (
        scheduleDate.getDate() === currentDay.getDate() &&
        scheduleDate.getMonth() === currentDay.getMonth() &&
        scheduleDate.getFullYear() === currentDay.getFullYear()
      );
    });
  };
  const addSchedule = async () => {
    try {
      await axios.post('http://localhost:3001/add-schedule', {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        user_id: authState.userId, // 사용자 ID를 추가합니다.
      });
      fetchSchedules(); // 일정을 추가한 후 다시 불러옵니다.
      setShowModal(false); // 모달 닫기
      // 추가한 일정을 초기화합니다.
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
    } catch (error) {
      console.error('Error adding schedule: ', error);
    }
  };

  return (
    <div className="calendar-container">
      {/* 캘린더 표 및 기타 요소 */}
      {showModal && (
        <Modal>
          {/* 모달 내용 */}
          <div>
            <input
              type="text"
              placeholder="이벤트 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="title"
            />
            <input
              type="text"
              placeholder="이벤트 설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              name="description"
            />
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              name="start_date"
            />
            <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} name="end_date" />
            <button onClick={addSchedule}>저장</button>
          </div>
        </Modal>
      )}
      <div className="calendar-header">
        <div className="monthMove">
          <button onClick={prevMonth}>&lt;</button>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <div className="yearsMonth" onClick={handleYearsMonthClick}>
          {monthNames[date.getMonth()]} {date.getFullYear()}년
        </div>
        <div className="goTo">
          <button onClick={goToToday} className="goToBtn">
            오늘
          </button>
        </div>
      </div>
      {showDatePicker && (
        <div className="date-picker">
          {/* DatePicker가 열렸을 때만 보입니다. */}
          <DatePicker
            selected={date}
            onChange={handleDatePickerChange}
            dateFormat="yyyy-MM-dd"
            placeholderText="날짜 선택"
            locale={ko}
          />
        </div>
      )}
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
