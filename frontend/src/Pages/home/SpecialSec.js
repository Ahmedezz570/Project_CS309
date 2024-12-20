
import shoe from '../../Components/Assets/—Pngtree—casual shoes_5640199.png'
import './SpecialSec.css'
const SpecialSec = () => {
    return (       <section className='special_pro container'>
        <div className='contain'>
          <div className='spec-text'>
            <p className='abs-p'> Deal</p>
            <h3> deal of the week </h3>
            <p style={{ margin: "8% 0", fontfamily: " cursive" }}>Hurry up! Products discounts up to 70%. </p>
            <a href="/allproduct"> + view all avaliable products </a>
          </div>
          <div className='products'>
            <div className="sm-card">
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
            <div className="sm-card sec-card">
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
            <div className="sm-card">
              <img src={shoe} alt=" no shoe " />
              <p className='name'> sport shoe </p>
              <p className='pricee'>$30.00</p>
              <del> $50.00</del>
            </div>
          </div>
        </div>
      </section>);
}
 
export default SpecialSec;