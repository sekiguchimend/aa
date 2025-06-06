import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SquirrelMascot from './SquirrelMascot';
import '../styles/TreatmentMethods.css';

const treatments = [
  {
    id: 1,
    name: 'おいしいお茶を飲もう',
    image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'food'
  },
  {
    id: 2,
    name: '部屋をあたためよう',
    image: 'https://images.pexels.com/photos/5699514/pexels-photo-5699514.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'comfort'
  },
  {
    id: 3,
    name: '有酸素運動をしよう',
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'exercise'
  },
  {
    id: 4,
    name: 'ヨガをしよう',
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'relaxation'
  },
  {
    id: 5,
    name: 'リラックス（アロマ・マッサージ等）しよう',
    image: 'https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'relaxation'
  },
  {
    id: 6,
    name: 'つぶやきをしよう',
    image: 'https://images.pexels.com/photos/3807729/pexels-photo-3807729.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mental'
  },
  {
    id: 7,
    name: 'アロマを焚こう',
    image: 'https://images.pexels.com/photos/4046718/pexels-photo-4046718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'relaxation'
  },
  {
    id: 8,
    name: 'お風呂を温めよう',
    image: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'relaxation'
  },
  {
    id: 9,
    name: 'マッサージをしよう',
    image: 'https://images.pexels.com/photos/3755761/pexels-photo-3755761.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'relaxation'
  },
  
];

const TreatmentMethods = () => {
  const [selectedTreatments, setSelectedTreatments] = useState<number[]>([]);
  const [customTreatment, setCustomTreatment] = useState('');
  const [showResults, setShowResults] = useState(false);

  const toggleTreatment = (id: number) => {
    if (selectedTreatments.includes(id)) {
      setSelectedTreatments(selectedTreatments.filter(treatmentId => treatmentId !== id));
    } else {
      setSelectedTreatments([...selectedTreatments, id]);
    }
  };

  const saveResults = () => {
    setShowResults(true);
  };

  return (
    <div className="treatment-methods">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">対処方法・記録</h1>
        <div className="pms-info-button">
          <span>PMSとは？</span>
        </div>
      </div>

      <div className="content">
        <div className="instruction-message">
          <div className="message-bubble">
            <p>症状の軽減や予防に向けたセルフケア方法を紹介するから試してみて。自分に合う方法を見つけてね</p>
          </div>
          <SquirrelMascot />
        </div>

        <p className="treatment-intro">
          ここでは、心と体の不調を軽減する方法のセルフケア方法を、詳しく紹介するね。正しい情報で辛い時期に、体調のサポートに繋がるよ！
        </p>

        <div className="treatments-grid">
          {treatments.slice(0, 6).map(treatment => (
            <div 
              key={treatment.id} 
              className={`treatment-card ${selectedTreatments.includes(treatment.id) ? 'selected' : ''}`}
              onClick={() => toggleTreatment(treatment.id)}
            >
              {treatment.image && (
                <img src={treatment.image} alt={treatment.name} className="treatment-image" />
              )}
              <p className="treatment-name">
                <span className="checkbox">□</span> {treatment.name}
              </p>
              <button className="check-link">ご詳しくチェック</button>
            </div>
          ))}
        </div>

        <div className="treatments-grid">
          {treatments.slice(6).map(treatment => (
            <div 
              key={treatment.id} 
              className={`treatment-card ${selectedTreatments.includes(treatment.id) ? 'selected' : ''}`}
              onClick={() => toggleTreatment(treatment.id)}
            >
              <img src={treatment.image} alt={treatment.name} className="treatment-image" />
              <p className="treatment-name">
                <span className="checkbox">□</span> {treatment.name}
              </p>
              {treatment.id !== 10 && <button className="check-link">ご詳しくチェック</button>}
              {treatment.id === 10 && (
                <textarea 
                  placeholder="実施した対処方法を入力"
                  value={customTreatment}
                  onChange={(e) => setCustomTreatment(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              )}
            </div>
          ))}
        </div>

        <button className="save-results-button" onClick={saveResults}>
          結果を見る
        </button>
      </div>
    </div>
  );
};

export default TreatmentMethods;