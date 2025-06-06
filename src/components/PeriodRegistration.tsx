import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/PeriodRegistration.css';

const PeriodRegistration = () => {
  const { periods, addPeriod, removePeriod } = useAppContext();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleAddPeriod = () => {
    if (startDate && endDate) {
      addPeriod({ startDate, endDate });
      setStartDate('');
      setEndDate('');
      setShowConfirmation(true);
    }
  };

  return (
    <div className="period-registration">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">生理日の記録</h1>
      </div>

      <div className="content">
        <div className="instruction-box">
          <span className="label">生理日</span>
          <span className="tag">記録</span>
          <div className="instructions">
            <p>「追加」を押して新たな生理期間を追加してね！</p>
            <p>修正したい場合はカレンダーマークを押してね！</p>
          </div>
        </div>

        <div className="date-input">
          <div className="date-field">
            <input 
              type="text" 
              placeholder="YYYY/MM/DD" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <button className="calendar-button">📅</button>
          </div>
          <span className="separator">〜</span>
          <div className="date-field">
            <input 
              type="text" 
              placeholder="YYYY/MM/DD"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <button className="calendar-button">📅</button>
          </div>
          <button className="delete-button">削除</button>
        </div>

        {periods.map((period, index) => (
          <div className="date-row" key={index}>
            <div className="date-field">
              <input type="text" value={period.startDate} readOnly />
              <button className="calendar-button">📅</button>
            </div>
            <span className="separator">〜</span>
            <div className="date-field">
              <input type="text" value={period.endDate} readOnly />
              <button className="calendar-button">📅</button>
            </div>
            <button 
              className="delete-button"
              onClick={() => removePeriod(index)}
            >
              削除
            </button>
          </div>
        ))}

        <button className="save-button" onClick={handleAddPeriod}>
          保存
        </button>

        {showConfirmation && (
          <div className="confirmation-dialog">
            <div className="dialog-content">
              <h3>i-lasso.work の内容</h3>
              <p>登録しました。</p>
              <button 
                className="ok-button"
                onClick={() => setShowConfirmation(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PeriodRegistration;