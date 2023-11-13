import "./ModalAccaunt.modules.css"
import { BsCart2 } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsEye } from 'react-icons/bs'
import { GrMoney } from 'react-icons/gr'
import { SlPeople } from 'react-icons/sl'
import { BsFileEarmarkSpreadsheet } from 'react-icons/bs'
import { BiExit } from 'react-icons/bi'

const ModalAccaunt = () => {

    const userInfo = JSON.parse(localStorage.getItem("user"));
    const onLogout = () => {localStorage.removeItem("auth");};

    return (
        <section className="modalaccaunt">
            <div className="photoandname">
                <div id="photo"></div>
                <div className="login" >
                    <span id="logintext">{userInfo.FIO}</span>
                </div>
            </div>
            <div className="modalaccaunticons">
                <div id="modalaccaunticons">
                    <BsCart2 style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Корзина</span>
                </div>
                <div id="modalaccaunticons">
                    <AiOutlineHeart style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Избранное</span>
                </div>
                <div id="modalaccaunticons">
                    <BsEye style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Просмотренные</span>
                </div>
                <div id="modalaccaunticons">
                    <GrMoney style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Бонусы</span>
                </div>
                <div id="modalaccaunticons">
                    <SlPeople style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Личные данные</span>
                </div>
                <div id="modalaccaunticons">
                    <BsFileEarmarkSpreadsheet style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">История покупок</span>
                </div>
                <div id="modalaccaunticons" onClick={onLogout}>
                    <BiExit style={{ fontSize: 20 }} />
                    <span id="modalaccaunticonstext">Выйти</span>
                </div>
            </div>
        </section>
    );
}
export default ModalAccaunt