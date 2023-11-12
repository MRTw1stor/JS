import "./Reviews.modules.css"
import {reviewItems} from "../../../dates.js"

const Reviews = () => {
    return (
        <section className="reviews">
            <div className="reviewstext">
                <span id ="reviewtext">Отзывы наших покупателей</span>
            </div>
            <div className="reviewsitems">
                {reviewItems.map((item) => (
                    <div className="reviewitem">
                        <div className="photo">
                            <img src={item.image} alt="images" id="reviewimage"/>
                        </div>
                        <div className="other">
                            <div className="stars">
                                {(new Array(item.stars).fill(0).map((item, idx) => (
                                    <img key={idx} src="./img/ClarityFavorite.svg" alt="" id="star" />
                                )))}
                            </div>
                            <div className="review">
                                <span id="review">{item.review}</span>
                            </div>
                            <div className="dates">
                                <span className="who">{item.name}</span>
                                <span className="date">{item.date}</span>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="elipsereview">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="92" viewBox="0 0 92 92" fill="none">
                        <circle cx="46" cy="46" r="45.5" stroke="#514A7E"/>
                        <path d="M65.159 47.8619C65.3543 47.6666 65.3543 47.35 65.159 47.1547L61.9771 43.9728C61.7818 43.7775 61.4652 43.7775 61.27 43.9728C61.0747 44.168 61.0747 44.4846 61.27 44.6799L64.0984 47.5083L61.27 50.3367C61.0747 50.532 61.0747 50.8486 61.27 51.0438C61.4652 51.2391 61.7818 51.2391 61.9771 51.0438L65.159 47.8619ZM27.1475 48.0083H64.8055V47.0083H27.1475V48.0083Z" fill="#514A7E"/>
                    </svg>
                </div>
            </div>
            <div className="reviewbutton">
                <button id="buttonreview">
                    <span id="revbuttontext">Добавить отзыв</span>
                </button>
            </div>
        </section>
    )
}

export default Reviews