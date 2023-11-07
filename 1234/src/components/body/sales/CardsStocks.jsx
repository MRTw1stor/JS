import "./CardsStocks.modules.css"
import { BsSuitHeart } from 'react-icons/bs'
import { GrShop } from 'react-icons/gr'

const CardsStocks = () => {
    const cardsItems = [
        {
            image: "./img/Rectangle23.jpg",
            price: "65.00 p",
            discauntprice: "50.00 p",
            name: "Блузка женская классная",
            stars: 4
        }, {
            image: "./img/Rectangle24.jpg",
            price: "65.00 p",
            discauntprice: "50.00 p",
            name: "Блузка женская классная",
            stars: 4
        }, {
            image: "./img/Rectangle25.jpg",
            price: "65.00 p",
            discauntprice: "50.00 p",
            name: "Блузка женская классная",
            stars: 4
        }, {
            image: "./img/Rectangle26.jpg",
            price: "65.00 p",
            discauntprice: "50.00 p",
            name: "Блузка женская классная",
            stars: 4
        }
    ];
    return (
        <div className="ItemsSales">
            {cardsItems.map((item) => (
            <div className="items">
                    <img src={item.image} alt="" id="images" />
                <div className="Prices">
                    <p className="discauntprice">{item.discauntprice}</p>
                    <p className="price">{item.price}</p>
                </div>
                <div className="name_icons">
                    <p className="name">{item.name}</p>
                    <div className="icons">
                        <BsSuitHeart style={{ fontSize: 20 }} id="followed"/>
                        <GrShop style={{fontSize : 20}} id="shoples"/>
                    </div>
                    </div>
                    
                <div className="stars_button">
                    <button className="details">
                        <span id="details">Подробнее</span>
                        <img src="./img/Arrow9.svg" alt="arrow" srcset="" id="Arrow9"/>
                        </button>
                        {(new Array(item.stars).fill(0).map((item, idx) => (
                            <img key={idx} src="./img/ClarityFavorite.svg" alt="" id="stars" />
                        )))}
                </div>
            </div>
            ))}
        </div>
    )
}

export default CardsStocks;