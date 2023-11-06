import "./Body.modules.css"
import MainScreen from "./mainscreen/MainScreen"
import WhyAreWe from "./whyarewe/WhyAreWe"
import TitleStock from "./sales/TitleStocks"
import CardsStocks from "./sales/CardsStocks"
import TitleReviews from "./reviews/TitleReviews"
import CardsReviews from "./reviews/CardsReviews"
import Buttonreviews from "./reviews/Buttonreviews"
import TitleQuestions from "./questions/TitleQuestions"
import CardsQuestions from "./questions/CardsQuestions"
import TitleCooperations from "./cooperations/TitleCooperations"
import CardsCooperations from "./cooperations/CardsCooperations"
import TitleCooperation from "./cooperations/TitleCooperation"
import CardsCooperation from "./cooperations/CardsCooperation"
import Formpage from "./form/Formpage"

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
            <div
            className="Questions">
                <TitleQuestions />
                <CardsQuestions />
            </div>
            <div className="Cooperations">
                <TitleCooperations />
                <CardsCooperations />
                <TitleCooperation />
                <CardsCooperation />
            </div>
            <div className="FormPage">
                <Formpage />
            </div>
        </div>
    )
}

export default Body