import "./Stocks.modules.css"

const Stocks = (props) => {
    console.log(props);
    return (
        <div className="ForSales">
            <p id="salestext1">Успей купить!</p>
            <p id="salestext2">Акции</p>
            <div className="ItemsSales">
                <div className="items">
                    <img src={props.image} alt="" />
                    <div className="ItemsName">
                        <p>{props.price}</p>
                        <p>{props.discauntprice}</p>
                        <p>{props.name}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stocks