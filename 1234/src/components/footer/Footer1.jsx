import {footerItems1} from "../../dates"

const Footer1 = () => {
    return (
        <div className="Footer">
            <span className="footertext">Информация</span>
            {footerItems1.map((item) => (
                <div className="footeritem">
                    <span className="footeritemtext">{item.text}</span>
                </div>
            ))}
        </div>
    )
}

export default Footer1