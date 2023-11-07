import {footerItems2} from "../../dates"

const Footer2 = () => {
    return (
        <div className="Footer">
            <span className="footertext">Мой кабинет</span>
            {footerItems2.map((item) => (
                <div className="footeritem">
                    <span className="footeritemtext">{item.text}</span>
                </div>
            ))}
        </div>
    )
}

export default Footer2