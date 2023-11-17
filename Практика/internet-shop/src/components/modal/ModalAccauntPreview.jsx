import "./ModalAccauntPreview.modules.css"
import { useState } from "react";
import {BsCart2} from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import {BsEye} from 'react-icons/bs'
import ModalEntry from "./ModalEntry";

const ModalAccauntPreview = () => {
    
    const [ showModalEntry, setShowModalEntry ] = useState(false);

    return (
        <section className="modalaccauntrew">
            <div className="photoandbutton">
                <div id="modalphoto"></div>
                <div className="buttonaccaunt" >
                    <button id="buttonaccaunt" onClick={() => setShowModalEntry(!showModalEntry)}>
                        <span className="buttonaccaunttext">Войти</span>
                    </button>
                </div>
            </div>
            <div className="modalaccaunticons">
                <div id="modalaccaunticons">
                    <BsCart2 style={{fontSize : 20}}/>
                    <span id="modalaccaunticonstext">Корзина</span>
                </div>
                <div id="modalaccaunticons">
                    <AiOutlineHeart style={{fontSize : 20}}/>
                    <span id="modalaccaunticonstext">Избранное</span>
                </div>
                <div id="modalaccaunticons">
                    <BsEye style={{fontSize : 20}}/>
                    <span id="modalaccaunticonstext">Просмотренные</span>
                </div>
            </div>
            <div>
                {showModalEntry ? <ModalEntry /> : null}
            </div>
        </section>
    );
};
  
export default ModalAccauntPreview;