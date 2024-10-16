import React, { useState } from 'react';
import './Switch.css'; 

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
      />
      <div className="toggle-switch-background">
        <div className="toggle-switch-handle"></div>
      </div>
    </label>
  );
};

export default Switch;
