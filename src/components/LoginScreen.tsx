import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SquirrelMascot from './SquirrelMascot';
import '../styles/LoginScreen.css';
type LoginScreenProps = {
  onLogin: () => void;
};

const LoginScreen = ({ onLogin }: LoginScreenProps) => {
  const navigate = useNavigate();
  const { login } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username);
    onLogin();
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div className="login-screen">
      <div className="header">
        <button className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </button>
        <h1 className="title">PMSアプリ</h1>
        <img 
          width={60}
          height={60}
          src={"/src/public/image.png"} alt="logo" className="logo" />
      </div>

      <div className="content">
        <div className="mascot-container">
          <div className="message-bubble">
            <p>こんにちは！</p>
          </div>
          <SquirrelMascot />
        </div>

        <div className="registration-section">
          <p className="instruction-text">初めての方・・・新規登録を行ってください。</p>
          <button className="signup-button" onClick={handleSignup}>
            新規登録
          </button>
        </div>

        <div className="login-section">
          <p className="instruction-text">登録済みの方・・・ログインしてください。</p>
          <button className="login-button" onClick={handleLogin}>
            ログイン
          </button>
        </div>

        <div className="forgot-password">
          <Link to="/forgot-password" className="forgot-password-link">
            ID・パスワードをお忘れの方
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;