import "./Sales.modules.css"
import { BsSuitHeart } from 'react-icons/bs'
import { GrShop } from 'react-icons/gr'
import {salesItems} from "../../../dates.js"

const Sales = () => {
    return (
        <section className="sales">
            <div className="salestext">
                <h1 id ="salestext1">Успей купить!</h1>
                <span id ="salestext2">Акции</span>
            </div>
            <div className="salesitems">
                {salesItems.map((item) => (
                    <div className="salesitem">
                        <img src={item.image} alt="" id="salesimage" />
                        <div className="prices">
                            <span className="discauntprice">{item.discauntprice}</span>
                            <span className="price">{item.price}</span>
                        </div>
                        <div className="name_icons">
                            <span className="name">{item.name}</span>
                            <div className="icons">
                                <BsSuitHeart style={{ fontSize: 20 }} id="followed"/>
                                <GrShop style={{fontSize : 20}} id="shoples"/>
                            </div>
                        </div>
                        <div className="stars_button">
                            <button className="details">
                                <span id="details">Подробнее</span>
                                <svg id="arrow3" xmlns="http://www.w3.org/2000/svg" width="26" height="4" viewBox="0 0 26 4" fill="none">
                                    <path d="M25.1768 2.17678C25.2744 2.07915 25.2744 1.92085 25.1768 1.82322L23.5858 0.232233C23.4882 0.134602 23.3299 0.134602 23.2322 0.232233C23.1346 0.329864 23.1346 0.488155 23.2322 0.585786L24.6464 2L23.2322 3.41421C23.1346 3.51184 23.1346 3.67014 23.2322 3.76777C23.3299 3.8654 23.4882 3.8654 23.5858 3.76777L25.1768 2.17678ZM0 2.25H25V1.75H0V2.25Z" fill="#121212"/>
                                </svg>
                                </button>
                                {(new Array(item.stars).fill(0).map((item, idx) => (
                                    <img key={idx} src="./img/ClarityFavorite.svg" alt="" id="stars" />
                                )))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Sales;