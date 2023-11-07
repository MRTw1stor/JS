import "./FooterPage.modules.css"
import FooterPage1 from "./FooterPage1"
import FooterPage2 from "./FooterPage2"
import FooterPage3 from "./FooterPage3"
import FooterPage4 from "./FooterPage4"

const FooterPage = () => {
    return (
        <div className="Footers">
            <FooterPage1 />
            <FooterPage2 />
            <FooterPage3 />
            <FooterPage4 />
            <img src="./img/LogoNeon.jpg" alt="images" id="LogoNeon"/>
        </div>
    )
}

export default FooterPage