import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from './components/SignUp';
import Login from './components/Login';
import RoleRedirect from './components/RoleRedirect';
import PrivateComponent from './components/PrivateComponent';
import Unauthorized from './components/Unauthorized';

import AdminPanel from './components/AdminPanel';
import ProductList from './components/ProductList';
import Addproduct from './components/Addproduct';
import UpdateProd from './components/UpdateProd';
import AdminOrders from './components/AdminViewReceivedOrders';
import UserProfile from './components/UserProfile';

import UserPanel from './components/Userpanel';
import Product from './components/Product';
import Profile from './components/Profileuser';
import Order from './components/Order';
import PaymentSuccess from './components/PaymentSuccess'
import PaymentCancel from './components/PaymentCancel';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          {/* Redirect to dashboard based on role */}
          <Route path='/' element={<RoleRedirect />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Admin Protected Routes */}
          <Route element={<PrivateComponent allowedRoles={['admin']} />}>
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/product-list" element={<ProductList />} />
            <Route path="/add" element={<Addproduct />} />
            <Route path="/update/:id" element={<UpdateProd />} />
            <Route path="/received-order" element={<AdminOrders />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>

          {/* User Protected Routes */}
          <Route element={<PrivateComponent allowedRoles={['user']} />}>
            <Route path="/user-panel" element={<UserPanel />} />
            <Route path="/user-panel/products" element={<Product />} />
            <Route path="/user-profile" element={<Profile />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancel" element={<PaymentCancel />} />

          </Route>
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
