import "./Sales.modules.css"
import SalesCard from "./SalesCard";

const Sales = () => {
    return (
        <section className="sales">
            <div className="salestext">
                <h1 id ="salestext1">Успей купить!</h1>
                <span id ="salestext2">Акции</span>
            </div>
            <SalesCard/>
        </section>
    )
}

export default Sales;