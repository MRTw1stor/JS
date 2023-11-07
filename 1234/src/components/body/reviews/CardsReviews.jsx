import "./CardsReviews.modules.css"
import ElipseReview from "./ElipseReviews";

const CardsReviews = () => {
    const cardsItems = [
        {
            stars: 5,
            image: "./img/Rectangle27.jpg",
            review: "Платье село отлично! Хороший материал. Буду заказывать еще, осталась очень довольна.",
            name: "Анна Котлова",
            date: "23.05.2023"
        }, {
            stars: 5,
            image: "./img/Rectangle28.jpg",
            review: "Заказываю постоянно одежду в этом магазине! Хорошие цены, хорошее качество! Приятные менеджеры! Все быстро, доступно, удобно! Спасибо.",
            name: "Анна Котлова",
            date: "23.05.2023"
        }
    ];
    return (
        <div className="ItemsRewiews">
            {cardsItems.map((item) => (
                <div className="item">
                    <div className="Photo">
                        <img src={item.image} alt="images" id="image"/>
                    </div>
                    <div className="Other">
                        <div className="Stars">
                            {(new Array(item.stars).fill(0).map((item, idx) => (
                                <img key={idx} src="./img/ClarityFavorite.svg" alt="" id="starss" />
                            )))}
                        </div>
                        <div className="Review">
                            <p className="review">{item.review}</p>
                        </div>
                        <div className="dates">
                            <div className="Who">
                                <p className="who">{item.name}</p>
                            </div>
                            <div className="Date">
                                <p className="date">{item.date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
           <ElipseReview/> 
        </div>
    )
}

export default CardsReviews