import React, { useEffect, useState } from 'react';
import './Switch.css';
import config from '../../config';

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/api/switch`);
      if (!response.ok) {
        throw new Error('Failed to fetch switch status');
      }
      const { status } = await response.json();
      setIsChecked(status); 
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async () => {
    const newStatus = !isChecked; 
    setIsChecked(newStatus);  

    try {
      const response = await fetch(`${config.BASE_URL}/api/switch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),  
      });
      if (!response.ok) {
        throw new Error('Failed to update switch status');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
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
    </div>
  );
};

export default Switch;
