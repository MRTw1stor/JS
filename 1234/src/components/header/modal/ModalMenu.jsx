import "./ModalMenu.modules.css"
import {modalMenuItems} from "../../../dates"
  
const ModalMenu = () => {
    return (
        <div className="modalmenu" disabled>
            <img src="./img/LogoNeon2.jpg" alt="images" id="LogoNeon2"/>
            {modalMenuItems.map((item) => (
                <div className="modalmenuitems">
                    <span className="modalmenuitemtext">{item.text}</span>
                </div>
            ))}
        </div>
    )
}

export default ModalMenu