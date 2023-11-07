import "./Body.modules.css"
import MainScreen from "./mainscreen/MainScreen"
import WhyAreWe from "./whyarewe/WhyAreWe"
import Sales from "./sales/Sales"
import Reviews from "./reviews/Reviews"
import Questions from "./questions/Questions"
import Cooperations from "./cooperations/Cooperations"
import Formpage from "./form/Formpage"

const Body = () => {

    return(
        <section className="body">
            <MainScreen/>
            <WhyAreWe/>
            <Sales />
            <Reviews />
            <Questions />
            <Cooperations />
            <Formpage />
        </section>
    )
}

export default Body