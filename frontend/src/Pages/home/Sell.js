import React from "react";
import Tshirt1 from "../../Components/Assets/T_shirts/Argentina.png";

const Sell = ({ isLoggedIn }) => {
  return (
    <section className="Best-sell">
      <h2>Best Selling</h2>
      <p className="par">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta nemo
        natus minus velit repellat? Minus natus tenetur exercitationem sed
        consequuntur ipsa quaerat!
      </p>
      <div className="cards">
        <div className="card">
          <img src={Tshirt1} alt="" />
          <div className="text">
            <a>View product</a>
            {isLoggedIn && <a>Add to Cart</a>}
          </div>
        </div>
        <div className="card">
          <img src={Tshirt1} alt="" />
          <div className="text">
            <a>View product</a>
            {isLoggedIn && <a>Add to Cart</a>}
          </div>
        </div>
        <div className="card">
          <img src={Tshirt1} alt="" />
          <div className="text">
            <a>View product</a>
            {isLoggedIn && <a>Add to Cart</a>}
          </div>
        </div>
        <div className="card">
          <img src={Tshirt1} alt="" />
          <div className="text">
            <a>View product</a>
            {isLoggedIn && <a>Add to Cart</a>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sell;

<section className='Best-sell'>
          <h2> best selling</h2>
          <p className='par'> Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Soluta nemo natus minus velit repellat? Minus natus tenetur exercitationem sed consequuntur ipsa quaerat!</p>
          <div className="cards">
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
                <a> add to cart  </a>

              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
                <a> add to cart  </a>
              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
                <a> add to cart  </a>
              </div>
            </div>
            <div className="card">
              <img src={Tshirt1} alt="" />
              <div className="text ">
                <a> View product  </a>
                <a> add to cart  </a>
              </div>
            </div>
          </div>
        </section>