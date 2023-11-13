import {cooperationsTexts} from "../../../dates.js"

const CooperationsText = () => {
    return (
        <div className="Cooperationstexts">
            <div className="cooperationstext">
                <h1 id ="cooperationstext1">Сотрудничество с нами</h1>
                <span id ="cooperationstext2">Наша компания постоянно растёт и расширяет рынок, поэтому мы заинтересованы в новых партнёрах и рассматриваем новые проекты, которые могут быть привлекательны и интересны с коммерческой точки зрения. </span>
            </div>
            <div className="cooperationstextitems">
                {cooperationsTexts.map((item) => (
                    <div className="cooperationstextitem">
                        <h1 className="textitem1">{item.title}</h1>
                        <span className="textitem2">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CooperationsText