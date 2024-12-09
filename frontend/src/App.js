import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Shop from './Pages/Shop';
import Special from './Pages/Special';
import Tranning from './Pages/Tranning';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <div className="App">     
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*  just for  test the images in public folder and the test data in datatest.js in src =================================           */}
        <Route path="/" element={<img src="/T_shirts/rm1.jpg" alt="rm" />} />
        {/* ========================= */}
          <Route path="/shop" element={<Shop />} />
          <Route path="/special" element={<Special />} />
          <Route path="/tranning" element={<Tranning />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
