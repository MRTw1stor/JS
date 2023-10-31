import "./Body.modules.css"
import MainScreen from "./MainScreen"
import WhyAreWe from "./WhyAreWe"
import Stocks from "./Stocks"
import items from "../../ItemsStocks"

const Body = () => {

    return(
        <div className="Body">
            <div className="MainScreen">
                <MainScreen/>
            </div>
            <div className="WhyAreWe">
                <WhyAreWe/>
            </div>
            <div className="Stocks">
                <Stocks
            image={items[0].image} 
            price={items[0].price} 
            discauntprice={items[0].discauntprice}
            name={items[0].name}/>
            </div> 
        </div>
    )
}

export default Body