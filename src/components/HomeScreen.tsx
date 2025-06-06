import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SquirrelMascot from './SquirrelMascot';
import CycleGraph from './CycleGraph';
import '../styles/HomeScreen.css';

const HomeScreen = () => {
  const { currentPMSPeriod, nextPeriodDate } = useAppContext();

  return (
    <div className="home-screen">
      <div className="header">
        <button className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </button>
        <h1 className="title">ホーム</h1>
        <div className="pms-info-button">
          <span>PMSとは？</span>
        </div>
      </div>

      <div className="content">
        <div className="mascot-message">
          <div className="message-text">
            <p>直近の生理日を記入しないと、月経周期を算出できないよ。</p>
            <Link to="/period-registration" className="add-period-link">こちらから直近の生理日を追加してね！</Link>
          </div>
          <SquirrelMascot />
        </div>

        <div className="period-info">
          <div className="info-box pms-period">
            <h3>PMS出現期間</h3>
            <p>{currentPMSPeriod.start} 〜 {currentPMSPeriod.end}</p>
          </div>
          <div className="info-box next-period">
            <h3>次の生理開始日</h3>
            <p>{nextPeriodDate}</p>
          </div>
        </div>

        <div className="cycle-graph-container">
          <h3 className="graph-title">次のグラフはあなたの直近の生理周期よ！</h3>
          <CycleGraph />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;