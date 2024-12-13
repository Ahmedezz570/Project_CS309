import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Shop from './Pages/home/Shop';
import Special from './Pages/Special';
import Tranning from './Pages/Tranning';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin/Admin';
import AddProduct from './Pages/Admin/AddProduct/AddProduct';
import ListProduct from './Pages/Admin/ListProduct/ListProduct';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
           <Route path="/" element={<Shop />} />
          <Route path="/special" element={<Special />} />
          <Route path="/tranning" element={<Tranning />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/admin" element = {<Admin />}/>
           <Route path='/addproduct' element={<AddProduct />}/>
           <Route path='/productlist' element={<ListProduct />}/>
        </Routes> 
       </BrowserRouter>  
    </div>
  );
}

export default App;
