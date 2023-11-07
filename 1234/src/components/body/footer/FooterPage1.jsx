import "./FooterPage1.modules.css"

const FooterPage1 = () => {
    const footerItens = [
        {
            id: 1,
            text:"Главная"
        },
        {
            id: 2,
            text:"Акции"
        },
        {
            id: 3,
            text:"Каталог"
        },
        {
            id: 4,
            text:"Возврат"
        },
        {
            id: 5,
            text:"Доставка"
        },
        {
            id: 6,
            text:"Партнёрам"
        },
        {
            id: 7,
            text:"Способы оплаты"
        },
        {
            id: 8,
            text:"Как сделать заказ?"
        }
    ]
    return (
        <div className="Information">
            <p className="textinform">Информация</p>
            {footerItens.map((item) => (
                <div className="item">
                    <p className="itemtext">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default FooterPage1