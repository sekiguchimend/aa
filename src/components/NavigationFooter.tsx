import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calendar, ClipboardList, Stethoscope, Settings, History } from 'lucide-react';

const NavigationFooter = () => {
  const location = useLocation();

  if (location.pathname === '/' || location.pathname === '/login') {
    return null;
  }

  return (
    <nav className="navigation-footer">
      <div className="nav-buttons">
        <Link 
          to="/period-registration" 
          className={`nav-button ${location.pathname === '/period-registration' ? 'active' : ''}`}
        >
          <ClipboardList size={20} className="icon" />
          <span>生理日</span>
        </Link>
        <Link 
          to="/calendar" 
          className={`nav-button ${location.pathname === '/calendar' ? 'active' : ''}`}
        >
          <Calendar size={20} className="icon" />
          <span>カレンダー</span>
        </Link>
        <Link 
          to="/history" 
          className={`nav-button ${location.pathname === '/history' ? 'active' : ''}`}
        >
          <History size={20} className="icon" />
          <span>履歴</span>
        </Link>
        <Link 
          to="/symptom-check" 
          className={`nav-button ${location.pathname === '/symptom-check' ? 'active' : ''}`}
        >
          <Stethoscope size={20} className="icon" />
          <span>症状</span>
        </Link>
        <Link 
          to="/settings" 
          className={`nav-button ${location.pathname === '/settings' ? 'active' : ''}`}
        >
          <Settings size={20} className="icon" />
          <span>設定</span>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationFooter;