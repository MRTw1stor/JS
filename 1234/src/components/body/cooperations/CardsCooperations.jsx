import "./CardsCooperations.modules.css"

const CardsCooperations = () => {
    const cardsText = [
        {
            title:"Становитесь партнёром",
            text:"Регистрируйтесь и переходите в свой кабинет"
        },{
            title:"Рекламируйте товары",
            text:"Рекламируйте наши товары на форумах, сайтах, в социальных сетях"
        },{
            title:"Приводите покупателей",
            text:"Приводите покупателей на наш сайт по уникальной ссылке"
        },{
            title:"Получайте бонусы",
            text:"Копите бонусы от каждого оплаченного заказа"
        }
    ]
    return (
        <div className="CardsCooperations">
            {cardsText.map((item) => (
                <div className="textes">
                    <p className="textes1">{item.title}</p>
                    <p className="textes2">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default CardsCooperations