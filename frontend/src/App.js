import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar';
import Dashboard from './Pages/Dashboard/Dashboard';
import Sales from './Pages/Sales/Sales';
import Customer from './Pages/Customer/Customer';
import Product from './Pages/Product/Product';
import GRN from './Pages/GRN/GRN';
import Stock from './Pages/Stock/Stock';
import Staff from './Pages/Staff/Staff';
import StockReports from './Pages/StockReports/StockReports';
import SalesReports from './Pages/SalesReport/SalesReports';
import Supplier from './Pages/Supplier/Supplier';
import Rental from './Pages/Rental/Rental';
import Login from './Pages/Login';

function Layout() {
  const location = useLocation();
  
  // Check if the current path is "/login" (case insensitive)
  const isLoginPage = location.pathname.toLowerCase() === '/login';

  return (
    <div className="d-flex">
      {!isLoginPage && <SideBar />}
      <div style={{ flexGrow: 1, margin: '20px 20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/sales/*" element={<Sales />} />
          <Route path="/rental/*" element={<Rental />} />
          <Route path="/customer/*" element={<Customer />} />
          <Route path="/product/*" element={<Product />} />
          <Route path="/grn/*" element={<GRN />} />
          <Route path="/stock/*" element={<Stock />} />
          <Route path="/supplier/*" element={<Supplier />} />
          <Route path="/sales-reports/*" element={<SalesReports />} />
          <Route path="/stock-reports/*" element={<StockReports />} />
          <Route path="/staff/*" element={<Staff />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
