import React from 'react';
import { ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/PeriodCalendar.css';

const PeriodCalendar = () => {
  const currentDate = new Date(2025, 3, 1); // April 2025

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = new Date(2025, 4, 0).getDate();
    const firstDay = new Date(2025, 3, 1).getDay();

    // Add previous month's days
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`prev-${i}`} className="calendar-day prev-month">30</div>);
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      const isPeriod = i >= 10 && i <= 16;
      const isPMS = i >= 25 && i <= 30;
      
      days.push(
        <div 
          key={i} 
          className={`calendar-day ${isPeriod ? 'period' : ''} ${isPMS ? 'pms' : ''}`}
        >
          {i}
          {isPeriod && <span className="period-icon">🌙</span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="period-calendar">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">生理カレンダー</h1>
        <button className="help-button">
          <HelpCircle color="#4EBDD1" size={24} />
          <span>PMSとは？</span>
        </button>
      </div>

      <div className="content">
        <div className="calendar-header">
          <button className="month-nav">
            <ChevronLeft size={20} />
          </button>
          <h2>2025年4月</h2>
          <button className="month-nav">
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="calendar-grid">
          <div className="weekday">日</div>
          <div className="weekday">月</div>
          <div className="weekday">火</div>
          <div className="weekday">水</div>
          <div className="weekday">木</div>
          <div className="weekday">金</div>
          <div className="weekday">土</div>
          {renderCalendarDays()}
        </div>

        <div className="calendar-legend">
          <p className="legend-instruction">記録しておきたい内容があれば、日付をタップして、症状・対処方法・メモを記入してね！</p>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon">🌙</span>
              <span>生理日</span>
            </div>
            <div className="legend-item">
              <div className="legend-color period"></div>
              <span>生理期間</span>
            </div>
            <div className="legend-item">
              <div className="legend-color pms"></div>
              <span>PMS出現期間</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodCalendar;