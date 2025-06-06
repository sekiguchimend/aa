import React from 'react';
import { ChevronLeft, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/HealthHistory.css';

const HealthHistory = () => {
  const months = ['2月', '3月', '4月'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  const getHealthStatus = (month: string, day: number) => {
    // 生理期間
    if (month === '2月' && day >= 16 && day <= 23) return { type: 'period', icon: '🌙' };
    if (month === '3月' && day >= 15 && day <= 23) return { type: 'period', icon: '🌙' };
    if (month === '4月' && day >= 10 && day <= 16) return { type: 'period', icon: '🌙' };
    
    // PMS期間
    if (month === '2月' && day >= 10 && day <= 15) return { type: 'pms', icon: '😞' };
    if (month === '3月' && day >= 9 && day <= 14) return { type: 'pms', icon: '😞' };
    if (month === '4月' && day >= 4 && day <= 9) return { type: 'pms', icon: '😞' };
    
    // 排卵期
    if (month === '2月' && day >= 2 && day <= 4) return { type: 'ovulation', icon: '🥚' };
    if (month === '3月' && day >= 1 && day <= 3) return { type: 'ovulation', icon: '🥚' };
    if (month === '3月' && day >= 29 && day <= 31) return { type: 'ovulation', icon: '🥚' };
    
    // 体調良好期間
    if (month === '2月' && day >= 24 && day <= 28) return { type: 'good', icon: '😊' };
    if (month === '3月' && day >= 24 && day <= 28) return { type: 'good', icon: '😊' };
    if (month === '4月' && day >= 17 && day <= 21) return { type: 'good', icon: '😊' };
    
    return null;
  };

  return (
    <div className="health-history">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">体調履歴</h1>
        <button className="help-button">
          <HelpCircle color="#4EBDD1" size={24} />
          <span>PMSとは？</span>
        </button>
      </div>

      <div className="content">
        <button className="legend-button">
          アイコンの説明
        </button>

        <div className="history-table">
          <div className="table-header">
            <div className="day-column">日</div>
            {months.map(month => (
              <div key={month} className="month-column">{month}</div>
            ))}
          </div>

          <div className="table-body">
            {days.map(day => (
              <div key={day} className="table-row">
                <div className="day-column">{day}</div>
                {months.map(month => {
                  const healthStatus = getHealthStatus(month, day);
                  return (
                    <div key={`${month}-${day}`} className="month-column">
                      {healthStatus && (
                        <span className={`health-icon ${healthStatus.type}`} title={healthStatus.type}>
                          {healthStatus.icon}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHistory;