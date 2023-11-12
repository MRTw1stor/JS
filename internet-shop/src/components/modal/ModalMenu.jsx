import "./ModalMenu.modules.css"
import {modalMenuItems} from "../../dates"
  
const ModalMenu = () => {
    return (
        <section className="modalmenu">
            <img src="./img/LogoNeon2.png" alt="images" id="LogoNeon2"/>
            {modalMenuItems.map((item) => (
                <div className="modalmenuitems">
                    <span className="modalmenuitemtext">{item.text}</span>
                </div>
            ))}
        </section>
    )
}

export default ModalMenu