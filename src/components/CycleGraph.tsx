import React from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/CycleGraph.css';

const CycleGraph = () => {
  const { periods, nextPeriodDate } = useAppContext();
  
  // 最新の生理データから各期間の日付を計算
  const calculateCycleDates = () => {
    if (periods.length === 0) return {
      periodStart: '-',
      periodEnd: '-',
      ovulationStart: '-',
      postPeriodStart: '-',
      pmsStart: '-'
    };
    
    const lastPeriod = periods[periods.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate.replace(/\//g, '-'));
    const lastEndDate = new Date(lastPeriod.endDate.replace(/\//g, '-'));
    
    // 生理期間（実際のデータ）
    const periodStart = lastStartDate;
    const periodEnd = lastEndDate;
    
    // 生理後期間（生理終了翌日から排卵日まで、約7日間）
    const postPeriodStart = new Date(periodEnd.getTime() + (1 * 24 * 60 * 60 * 1000));
    
    // 排卵期（生理開始から約14日後、3日間）
    const ovulationStart = new Date(periodStart.getTime() + (14 * 24 * 60 * 60 * 1000));
    
    // PMS期間（次の生理開始の7-10日前）
    const nextPeriodStart = new Date(periodStart.getTime() + (28 * 24 * 60 * 60 * 1000));
    const pmsStart = new Date(nextPeriodStart.getTime() - (10 * 24 * 60 * 60 * 1000));
    
    return {
      periodStart: `${periodStart.getMonth() + 1}/${periodStart.getDate()}`,
      periodEnd: `${periodEnd.getMonth() + 1}/${periodEnd.getDate()}`,
      ovulationStart: `${ovulationStart.getMonth() + 1}/${ovulationStart.getDate()}`,
      postPeriodStart: `${postPeriodStart.getMonth() + 1}/${postPeriodStart.getDate()}`,
      pmsStart: `${pmsStart.getMonth() + 1}/${pmsStart.getDate()}`
    };
  };

  const cycleDates = calculateCycleDates();
  
  // 現在の周期の状態を判定
  const getCurrentPhase = () => {
    if (periods.length === 0) return '記録なし';
    
    const today = new Date();
    const lastPeriod = periods[periods.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate.replace(/\//g, '-'));
    const lastEndDate = new Date(lastPeriod.endDate.replace(/\//g, '-'));
    
    // 生理中かどうか
    if (today >= lastStartDate && today <= lastEndDate) {
      return '生理中';
    }
    
    // 生理後
    const postPeriodEnd = new Date(lastStartDate.getTime() + (13 * 24 * 60 * 60 * 1000));
    if (today > lastEndDate && today <= postPeriodEnd) {
      return '生理後';
    }
    
    // 排卵期
    const ovulationStart = new Date(lastStartDate.getTime() + (14 * 24 * 60 * 60 * 1000));
    const ovulationEnd = new Date(lastStartDate.getTime() + (16 * 24 * 60 * 60 * 1000));
    if (today >= ovulationStart && today <= ovulationEnd) {
      return '排卵期';
    }
    
    // PMS期間
    const nextPeriodStart = new Date(lastStartDate.getTime() + (28 * 24 * 60 * 60 * 1000));
    const pmsStart = new Date(nextPeriodStart.getTime() - (10 * 24 * 60 * 60 * 1000));
    if (today >= pmsStart && today < nextPeriodStart) {
      return 'PMS';
    }
    
    return '通常期';
  };

  const currentPhase = getCurrentPhase();
  
  // 最新の生理データから表示用の日付を計算
  const getDisplayDates = () => {
    if (periods.length === 0) return { cycleDay: '-', startDay: '-' };
    
    const lastPeriod = periods[periods.length - 1];
    const lastStartDate = new Date(lastPeriod.startDate.replace(/\//g, '-'));
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - lastStartDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      cycleDay: `${lastStartDate.getMonth() + 1}/${lastStartDate.getDate()}(${daysDiff + 1}日目)`,
      startDay: `${lastStartDate.getMonth() + 1}/${lastStartDate.getDate()}(1日目)`
    };
  };

  const displayDates = getDisplayDates();

  return (
    <div className="cycle-graph">
      <div className="dates">
        <div className="date date1">{nextPeriodDate}(予定)</div>
        <div className="date date2">{displayDates.startDay}</div>
      </div>
      
      <div className="graph-container">
        <div className="circle-graph">
          <div className="segment pms-segment"></div>
          <div className="segment period-segment"></div>
          <div className="segment post-period-segment"></div>
          <div className="segment ovulation-segment"></div>
          <div className="inner-circle">
            <div className="current-phase">{currentPhase}</div>
          </div>
        </div>
        
        {/* 外側のラベル */}
        <div className="segment-labels">
          <div className="label-item pms-label">
            <div className="label-line"></div>
            <span className="label-text">PMS</span>
          </div>
          <div className="label-item period-label">
            <div className="label-line"></div>
            <span className="label-text">生理中</span>
          </div>
          <div className="label-item post-period-label">
            <div className="label-line"></div>
            <span className="label-text">生理後</span>
          </div>
          <div className="label-item ovulation-label">
            <div className="label-line"></div>
            <span className="label-text">排卵期</span>
          </div>
        </div>
        
        <div className="date-markers">
          <div className="date-marker marker1">
            <span className="marker-date">{cycleDates.periodEnd}</span>
            <span className="marker-label">生理終了</span>
          </div>
          <div className="date-marker marker2">
            <span className="marker-date">{cycleDates.ovulationStart}</span>
            <span className="marker-label">排卵期</span>
          </div>
          <div className="date-marker marker3">
            <span className="marker-date">{cycleDates.pmsStart}</span>
            <span className="marker-label">PMS開始</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycleGraph;