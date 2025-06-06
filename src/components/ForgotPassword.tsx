import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SquirrelMascot from './SquirrelMascot';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  return (
    <div className="forgot-password">
      <div className="header">
        <Link to="/" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">ID・パスワードの再設定</h1>
      </div>

      <div className="content">
        <div className="mascot-message">
          <div className="message-bubble">
            <p>登録したメールアドレスを入力してください。</p>
            <p>パスワード再設定用のメールをお送りします。</p>
          </div>
          <SquirrelMascot />
        </div>

        <form onSubmit={handleSubmit} className="reset-form">
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="登録したメールアドレスを入力"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            送信
          </button>
        </form>

        {showConfirmation && (
          <div className="confirmation-dialog">
            <div className="dialog-content">
              <h3>メールを送信しました</h3>
              <p>
                パスワード再設定用のメールを送信しました。<br />
                メールの指示に従って、パスワードの再設定を行ってください。
              </p>
              <Link to="/" className="ok-button">
                OK
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;