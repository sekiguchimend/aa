import React from 'react';
import '../styles/SquirrelMascot.css';

const SquirrelMascot = () => {
  return (
    <div className="squirrel-mascot">
      {/* The squirrel is displayed as an image */}
      <img 
        src="https://images.pexels.com/photos/47547/squirrel-animal-cute-rodents-47547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
        alt="リスのマスコット" 
        className="mascot-image"
      />
    </div>
  );
};

export default SquirrelMascot;