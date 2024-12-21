import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/NavBar/Navbar';
import Shop from './Pages/home/Shop';
import Special from './Pages/Special';
import National from './Pages/national';
import Tranning from './Pages/Tranning';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin/Admin';
import AddProduct from './Pages/Admin/AddProduct/AddProduct';
import ListProduct from './Pages/Admin/ListProduct/ListProduct';
import UpdateProduct from './Pages/Admin/UpdateProduct/UpdateProduct';
import Profile from './Pages/profile';
import AllProduct from './Pages/AllProduct';
import SingleItem from './Pages/SingleItem/SingleItem';

function App() {
  return (

    <div className="App">
      {/* <Navbar /> */}
       <BrowserRouter>
       
        <Routes>
           <Route path="/" element={<Shop />} />
          <Route path="/special" element={<Special />} />
          <Route path="/national" element={<National />} />
          <Route path="/tranning" element={<Tranning />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
           <Route path="/admin" element = {<Admin />}/>
           <Route path='/addproduct' element={<AddProduct />}/>
           <Route path='/productlist' element={<ListProduct />}/>
           <Route path='/updateproduct' element={<UpdateProduct/>}/>
           <Route path="/profile" element={<Profile/>} />
           <Route path='/allproduct' element ={<AllProduct/>}/>
           <Route path='/product/:productId' element={<SingleItem />} />
        </Routes> 
       </BrowserRouter>  
    </div>
  );
}

export default App;
