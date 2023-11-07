import "./FooterPage2.modules.css"

const FooterPage2 = () => {
    const footerItens = [
        {
            id: 1,
            text:"Мои заказы"
        },
        {
            id: 2,
            text:"Мои адреса"
        },
        {
            id: 3,
            text:"Мои скидки"
        },
        {
            id: 4,
            text:"Моя информация"
        }
    ]
    return (
        <div className="Information">
            <p className="textinform">Мой кабинет</p>
            {footerItens.map((item) => (
                <div className="item">
                    <p className="itemtext">{item.text}</p>
                </div>
            ))}
        </div>
    )
}

export default FooterPage2