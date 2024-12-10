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
<<<<<<< HEAD
    <div className="App">
      <Shop/>
      {/* <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Shop />} />
=======
    <div className="App">     
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/*  just for  test the images in public folder and the test data in datatest.js in src =================================           */}
        <Route path="/" element={<img src="/T_shirts/rm1.jpg" alt="rm" />} />
        {/* ========================= */}
          <Route path="/shop" element={<Shop />} />
>>>>>>> 821a43a78bb515394126674f0d5446b3ab886282
          <Route path="/special" element={<Special />} />
          <Route path="/tranning" element={<Tranning />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        </Routes> */}
      {/* </BrowserRouter> */} 
=======
        </Routes>
      </BrowserRouter>
      
>>>>>>> 821a43a78bb515394126674f0d5446b3ab886282
    </div>
  );
}

export default App;
