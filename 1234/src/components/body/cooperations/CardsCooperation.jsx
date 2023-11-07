import "./CardsCooperation.modules.css"

const CardsCooperation = () => {
    const cardsItems = [
        {
            img: "./img/Settings.svg",
            text:"Автоматизация процессов"
        },
        {
            img: "./img/Assortment.svg",
            text:"Пополнение ассортимента"
        },
        {
            img: "./img/Support.svg",
            text:"Поддержка и обучение"
        },
        {
            img: "./img/Coins.svg",
            text:"Бонусы за новых клиентов"
        }
    ]
    return (
        <div className="CardsCooperation">
            {cardsItems.map((item) => (
                <div className="Items">
                    <img src={item.img} alt="" id="img" />
                    <p className="textes4">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default CardsCooperation