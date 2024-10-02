import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <BrowserRouter>
    <div className="d-flex" >
      <SideBar />
      <main style={{ flexGrow: 1, padding: '20px 10px' }}>
        <Routes>
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
        <Route path="/staff" element={<Staff />} />

        </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
