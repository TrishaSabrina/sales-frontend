import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard/Dashboard';
import AddProducts from './pages/products/AddProducts';
import Products from './pages/products/Products';
import AddCustomers from './pages/customers/AddCustomer';
import Customer from './pages/customers/Customer';
import AddSales from './pages/sales/AddSales';
import SalesList from './pages/sales/SalesList';
import AddProductso from './pages/products1/AddProductso';
import Productso from './pages/products1/Productso'

function App() {
  return (
    <div className="wrapper">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addproduct" element={<AddProducts />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addcustomers" element={<AddCustomers />} />
      <Route path="/customers" element={<Customer />} />
      <Route path="/addsales" element={<AddSales />} />
      <Route path="/sales" element={<SalesList />} />
      <Route path="/purchase" element={<AddProductso />} />
      <Route path="/purchase" element={<Productso />} />



      </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;