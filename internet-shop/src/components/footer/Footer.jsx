import "./Footer.modules.css"
import Footer1 from "./Footer1"
import Footer2 from "./Footer2"
import Footer3 from "./Footer3"
import Footer4 from "./Footer4"

const Footer = () => {
    return (
        <section className="footer">
            <div className="footeritems">
                <Footer1 />
                <Footer2 />
                <Footer3 />
                <Footer4 />
                <img src="./img/LogoNeon.jpg" alt="images" id="LogoNeon"/>
            </div>
        </section>
    )
}

export default Footer