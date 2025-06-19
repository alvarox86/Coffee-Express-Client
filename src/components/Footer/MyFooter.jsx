import "./MyFooter.css"
import mastercardIcon from "../../assets/images/mastercard.png"
import visaIcon from "../../assets/images/visa.png"
import { Link } from "react-router-dom"

function MyFooter() {
  return (
    <footer className="footer">
            <div className="footerContent">
                <div className="footerSection links">
                    <h4>Quick links</h4>
                    <ul>
                        <li><Link to="/" style={{textDecoration:"none", color: "black"}}>Home</Link></li>
                        <li><Link to="/products" style={{textDecoration:"none", color: "black"}}>Products</Link></li>
                    </ul>
                </div>
                <div className="footerSection contact">
                    <h4>Contact</h4>
                    <p>If you have any questions, please contact us!</p>
                    <p> +34 600 123 456</p>
                    <p> support@coffeeexpress.com</p>
                </div>
                <div className="footerSection payments">
                    <h4>Methods of payment</h4>
                    <ul>
                        <li><img src={mastercardIcon} alt="mastercard" className="mastercard"/></li>
                        <li><img src={visaIcon} alt="visa" className="visa"/></li>
                    </ul>
                </div>
            </div>
            <div className="footerBottom">
                <p>&copy; 2025 Coffee Express | Terms of Service | Privacy Policy</p>
            </div>
    </footer>
  )
}

export default MyFooter