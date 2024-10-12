import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

const Header = () => {
  const navigate = useNavigate(); 

  const handleNewSaleClick = () => {
    navigate('/sales/new'); 
  };

  return (
    <div>
      <header className="d-flex align-items-center justify-content-between p-3 bg-secondary text-light" style={{ width: '100%', position: 'relative' }}>
        <div className="d-flex align-items-center">
          <img 
            src="https://openui.fly.dev/openui/24x24.svg?text=✨" 
            alt="Logo" 
            className="me-2" 
            style={{ height: '32px', width: '32px'}} 
          />
          <h1 className="h4 mb-0">LOGO</h1>
        </div>
        <div className="d-flex align-items-center">
          <span className="text-white me-4 d-none d-md-block">Trial Version: Only 19 days remaining</span>
          <button className="btn btn-danger" onClick={handleNewSaleClick}>New Sale</button>
        </div>
      </header>
    </div>
  );
};

export default Header;
