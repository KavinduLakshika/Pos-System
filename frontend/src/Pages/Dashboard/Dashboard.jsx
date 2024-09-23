import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="d-flex">
      <main style={{marginLeft: '30px', width: 'calc(100% - 60px)', padding: '20px'}}>
        <h1 className="h2 mb-4">Dashboard</h1>
        <p>Welcome to your POS System Dashboard. Select an option from the menu to get started.</p>
      </main>
    </div>
  );
};

export default Dashboard;