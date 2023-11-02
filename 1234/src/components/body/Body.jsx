import "./Body.modules.css"
import MainScreen from "./mainscreen/MainScreen"
import WhyAreWe from "./whyarewe/WhyAreWe"
import TitleStock from "./sales/TitleStocks"
import CardsStocks from "./sales/CardsStocks"
import TitleReviews from "./reviews/TitleReviews"
import CardsReviews from "./reviews/CardsReviews"
import Buttonreviews from "./reviews/Buttonreviews"

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
                <TitleStock />
                <CardsStocks />
            </div>
            <div className="Reviews">
                <TitleReviews />
                <CardsReviews />
                <Buttonreviews />
            </div>
        </div>
    )
}

export default Body