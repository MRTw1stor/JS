import "./WhyAreWe.modules.css"

const WhyAreWe = () => {
    return (
        <div className="WhyAreWe">
            <div className="Whyarewe">
                <p id="whytext">Почему выбирают нас?</p>
                <div className="whytitle1">
                    <div id="elipse1"></div>
                    <p id="why">Скидка постоянным <br />клиентам от 5%</p>
                    <p id="why">Предлагаем самые <br /> выгодные цены</p>
                    <div id="elipse2"></div>
                    <p id="why">Наши покупатели всегда <br /> остаются довольны</p>
                    <p id="why">Широкий ассортимент <br /> товаров для всей семьи</p>
                </div>
                <div className="whytitle2">
                    <div id="elipse3"></div>
                    <p id="why">Возможность доставки в <br /> любой город Беларуси </p>
                    <div id="elipse4"></div>
                    <p id="why">Пункты выдачи заказов <br /> рядом с домом</p>
                </div>
            </div>
            <div id="elipse5">
                <img src="./img/Arrow10.svg" alt="arrow" srcset="" id="Arrow10"/>
            </div>
            <div id="elipse6">
                <img src="./img/Chat.svg" alt="chat" srcset="" id="Chat"/>
            </div>
        </div>
    )
}

export default WhyAreWe