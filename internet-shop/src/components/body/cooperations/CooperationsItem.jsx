import {cooperationsItems} from "../../../dates.js"

const CooperationsItem = () => {
    return (
        <div className="Cooperationsitem">
            <div className="cooperationsitemtext">
                <span id ="cooperationsitemtext1">Это выгодно. Какие преимущества?</span>
            </div>
            <div className="cooperationsitems">
                {cooperationsItems.map((item) => (
                    <div className="cooperationsitem">
                        <img src={item.img} alt="" id="cooperationsimg" />
                        <div className="cooperationsitemtext">
                            <span className="cooperationsitemtext2">{item.text}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CooperationsItem