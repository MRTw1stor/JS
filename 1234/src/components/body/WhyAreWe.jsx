import "./WhyAreWe.modules.css"
import Arrow10 from "../../img/Arrow10.svg"
import Chat from "../../img/Chat.svg"

const WhyAreWe = () => {
    return (
        <div className="WhyAreWe">
            <div className="Whyarewe">
                <p id="whytext">Почему выбирают нас?</p>
                <div className="whytitle1">
                    <div id="elipse1"></div>
                    <p id="why1">Скидка постоянным <br />клиентам от 5%</p>
                    <p id="why2">Предлагаем самые <br /> выгодные цены</p>
                    <div id="elipse2"></div>
                    <p id="why3">Наши покупатели всегда <br /> остаются довольны</p>
                    <p id="why4">Широкий ассортимент <br /> товаров для всей семьи</p>
                </div>
                <div className="whytitle2">
                    <div id="elipse3"></div>
                    <p id="why5">Возможность доставки в <br /> любой город Беларуси </p>
                    <div id="elipse4"></div>
                    <p id="why6">Пункты выдачи заказов <br /> рядом с домом</p>
                </div>
            </div>
            <div id="elipse5">
                <img src={Arrow10} alt="arrow" srcset="" id="Arrow10"/>
            </div>
            <div id="elipse6">
                <img src={Chat} alt="chat" srcset="" id="Chat"/>
            </div>
        </div>
    )
}

export default WhyAreWe