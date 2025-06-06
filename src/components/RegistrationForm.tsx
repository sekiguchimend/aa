import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/RegistrationForm.css';

type Step = 'account' | 'period';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [currentStep, setCurrentStep] = useState<Step>('account');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    periodDay: '',
    currentPeriod: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    navigate('/home'); // Navigate to home screen
  };

  const renderAccountStep = () => (
    <div className="registration-step">
      <h2>ID・パスワード登録</h2>
      
      <div className="form-group">
        <label>ID</label>
        <input
          type="email"
          name="email"
          placeholder="メールアドレスを記入してください。"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>パスワード</label>
        <input
          type="password"
          name="password"
          placeholder="半角英数字と記号の文字以内で設定してください。"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>パスワード(確認用)</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>年齢</label>
        <div className="age-input">
          <select 
            name="age" 
            value={formData.age}
            onChange={handleInputChange}
          >
            <option value="">年齢を選択</option>
            {Array.from({ length: 83 }, (_, i) => i + 13).map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
          <span>歳</span>
        </div>
      </div>

      <button 
        className="next-button"
        onClick={() => setCurrentStep('period')}
        disabled={!formData.email || !formData.password || !formData.confirmPassword || !formData.age}
      >
        次へ
      </button>
    </div>
  );

  const renderPeriodStep = () => (
    <div className="registration-step">
      <h2>生理日の登録</h2>

      <p className="period-instruction">
        あなたの生理は、およそ何日周期で現れますか。
      </p>

      <div className="form-group">
        <div className="period-input">
          <select
            name="periodDay"
            value={formData.periodDay}
            onChange={handleInputChange}
          >
            <option value="">日数を選択</option>
            {Array.from({ length: 15 }, (_, i) => i + 21).map(days => (
              <option key={days} value={days}>{days}</option>
            ))}
          </select>
          <span>日</span>
        </div>
        <p className="period-note">※生理が始まった日から次の生理が始まる前日までの期間</p>
      </div>

      <div className="form-group">
        <p>現在のあなたに当てはまるものを選び、生理日を選択してください</p>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="currentPeriod"
              value="during"
              checked={formData.currentPeriod === 'during'}
              onChange={handleInputChange}
            />
            現在生理中
          </label>
          <label>
            <input
              type="radio"
              name="currentPeriod"
              value="not"
              checked={formData.currentPeriod === 'not'}
              onChange={handleInputChange}
            />
            生理中ではない
          </label>
          <label>
            <input
              type="radio"
              name="currentPeriod"
              value="later"
              checked={formData.currentPeriod === 'later'}
              onChange={handleInputChange}
            />
            後で登録する
          </label>
        </div>
      </div>

      <div className="button-group">
        <button 
          className="back-button"
          onClick={() => setCurrentStep('account')}
        >
          戻る
        </button>
        <button 
          className="submit-button"
          onClick={handleSubmit}
          disabled={!formData.periodDay || !formData.currentPeriod}
        >
          登録
        </button>
      </div>
    </div>
  );

  return (
    <div className="registration-form">
      <div className="header">
        <Link to="/" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">新規登録</h1>
      </div>

      <div className="content">
        {currentStep === 'account' && renderAccountStep()}
        {currentStep === 'period' && renderPeriodStep()}
      </div>
    </div>
  );
};

export default RegistrationForm;