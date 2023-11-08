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
            <div id="bigelipse1" className="bigelipse"></div>
            <WhyAreWe/>
            <Sales />
            <Reviews />
            <div id="bigelipse2" className="bigelipse"></div>
            <Questions />
            <Cooperations />
            <Formpage />
            <div id="bigelipse3" className="bigelipse"></div>
            <div id="purple"></div>
        </section>
    )
}

export default Body