import React from 'react'
import './CSS/Shop.css';
import Navbar from '../Components/NavBar/Navbar';
import Tshirt1 from '../Components/Assets/T_shirts/Argentina.png'
const Shop = () => {
  return (
    <div>
      <div className="nav-sec">
        <Navbar />
      </div>
      <div className="container">
        <section className='Best-sell'>
          <h2> best selling</h2>
          <p className='par'> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Soluta nemo natus minus velit repellat? Minus natus tenetur exercitationem sed consequuntur ipsa quaerat!</p>
          <div className="cards">
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </div>


  );
}

export default Shop;