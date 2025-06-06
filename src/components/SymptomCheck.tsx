import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import SquirrelMascot from './SquirrelMascot';
import '../styles/SymptomCheck.css';

const symptoms = [
 
  {
    id: 1,
    name: '頭痛、腹痛がした、眠くなった',
    image: 'https://images.pexels.com/photos/3807381/pexels-photo-3807381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'pain'
  },
  {
    id: 2,
    name: '乳房の張り、お腹の張り、体重増加があった',
    image: 'https://images.pexels.com/photos/5938440/pexels-photo-5938440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'bloating'
  },
  {
    id: 3,
    name: 'イライラした、落ち込んだ',
    image: 'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mental'
  },
  {
    id: 4,
    name: '不安になった、気分が変わりやすかった',
    image: 'https://images.pexels.com/photos/3807866/pexels-photo-3807866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'mental'
  }
];

type SymptomSeverity = 'mild' | 'moderate' | 'severe';

type SelectedSymptom = {
  id: number;
  severity: SymptomSeverity;
};

const SymptomCheck = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSymptom = (id: number) => {
    const existingSymptom = selectedSymptoms.find(s => s.id === id);
    if (existingSymptom) {
      setSelectedSymptoms(selectedSymptoms.filter(symptom => symptom.id !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, { id, severity: 'mild' }]);
    }
  };

  const updateSeverity = (id: number, severity: SymptomSeverity) => {
    setSelectedSymptoms(selectedSymptoms.map(symptom => 
      symptom.id === id ? { ...symptom, severity } : symptom
    ));
  };

  const getSeverityLabel = (severity: SymptomSeverity) => {
    switch (severity) {
      case 'mild': return '軽い';
      case 'moderate': return '普通';
      case 'severe': return '重い';
    }
  };

  const getSeverityIcon = (severity: SymptomSeverity) => {
    switch (severity) {
      case 'mild': return '😐';
      case 'moderate': return '😞';
      case 'severe': return '😵';
    }
  };

  const checkResults = () => {
    setShowResults(true);
  };

  if (showResults) {
    return (
      <div className="symptom-results">
        <div className="header">
          <Link to="/symptom-check\" className="back-button\" onClick={() => setShowResults(false)}>
            <ChevronLeft color="#4EBDD1" size={28} />
          </Link>
          <h1 className="title">結果</h1>
          <div className="pms-info-button">
            <span>PMSとは？</span>
          </div>
        </div>

        <div className="content">
          <div className="result-message">
            <div className="message-bubble">
              <p>PMSの可能性があるよ。対処方法を参考にして対応してみてね！</p>
            </div>
            <SquirrelMascot />
          </div>

          <div className="pms-info">
            <h3>PMSとうまく付き合うポイント</h3>
            <p>
              PMSの原因・病態はまだ解明されていないため、確立した治療法はありません。そのため、原因や症状を予測するために、日々の生活習慣を改善してみましょう。
            </p>
            <ul>
              <li>バランスよい食事をしましょう。</li>
              <li>日々の生活に有酸素運動を取り入れましょう。</li>
              <li>ストレスを減らす工夫をしてみましょう。</li>
              <li>十分な睡眠を取りましょう。</li>
              <li>症状がひどいときは医師に相談しましょう。</li>
            </ul>
          </div>

          <Link to="/treatment-methods" className="treatment-button">
            対処方法を記録する
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="symptom-check">
      <div className="header">
        <Link to="/home" className="back-button">
          <ChevronLeft color="#4EBDD1" size={28} />
        </Link>
        <h1 className="title">身体の症状</h1>
      </div>

      <div className="content">
        <div className="symptoms-grid">
          {symptoms.map(symptom => {
            const selectedSymptom = selectedSymptoms.find(s => s.id === symptom.id);
            const isSelected = !!selectedSymptom;
            
            return (
              <div 
                key={symptom.id} 
                className={`symptom-card ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleSymptom(symptom.id)}
              >
                <img src={symptom.image} alt={symptom.name} className="symptom-image" />
                <p className="symptom-name">{symptom.name}</p>
                {isSelected && (
                  <div className="symptom-controls">
                    <div className="selected-indicator">
                      {getSeverityIcon(selectedSymptom.severity)}
                    </div>
                    <div className="severity-selector">
                      <label>重さ：</label>
                      <select 
                        value={selectedSymptom.severity} 
                        onChange={(e) => updateSeverity(symptom.id, e.target.value as SymptomSeverity)}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <option value="mild">軽い</option>
                        <option value="moderate">普通</option>
                        <option value="severe">重い</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button className="check-results-button" onClick={checkResults}>
          結果を見る
        </button>
      </div>
    </div>
  );
};

export default SymptomCheck;