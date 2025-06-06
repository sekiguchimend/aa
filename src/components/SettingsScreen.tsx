import React, { useState } from 'react';
import { ChevronLeft, Bell, Moon, Calendar, Lock, HelpCircle, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import '../styles/SettingsScreen.css';

const SettingsScreen = () => {
  const { logout } = useAppContext();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="settings-screen">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">設定</h1>
      </div>

      <div className="content">
        <div className="settings-section">
          <h2 className="section-title">アプリの設定</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <Bell size={20} className="setting-icon" />
              <span>通知</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <Moon size={20} className="setting-icon" />
              <span>ダークモード</span>
            </div>
            <label className="toggle">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <Calendar size={20} className="setting-icon" />
              <span>生理周期の設定</span>
            </div>
            <ChevronLeft size={20} className="chevron" />
          </div>
        </div>

        <div className="settings-section">
          <h2 className="section-title">アカウント</h2>
          
          <div className="setting-item">
            <div className="setting-info">
              <Lock size={20} className="setting-icon" />
              <span>パスワードの変更</span>
            </div>
            <ChevronLeft size={20} className="chevron" />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <HelpCircle size={20} className="setting-icon" />
              <span>ヘルプ</span>
            </div>
            <ChevronLeft size={20} className="chevron" />
          </div>
        </div>

        <button className="logout-button" onClick={logout}>
          <LogOut size={20} className="logout-icon" />
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default SettingsScreen;