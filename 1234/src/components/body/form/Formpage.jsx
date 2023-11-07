import "./Formpage.modules.css"

const Formpage = () => {
    return (
        <section className="formpage">
            <div className="Form">
                <div className="form">
                    <div className="formtext">
                        <span id="text">Приглашаем  к сотрудничеству производителей и поставщиков одежды, обуви и аксессуаров</span>
                    </div>
                    <div className="formitems">
                        <div>
                            <input className="forminput" type="text" placeholder="Ваше имя"/>
                        </div>
                        <div>
                            <input className="forminput" type="text" placeholder="Номер телефона"/>
                        </div>
                        <div>
                            <input className="forminput" type="text" placeholder="Электронная почта"/>
                        </div>
                        <div className="inputcheck">
                            <input id="inputcheck" type="checkbox"/>
                            <span className="inputtext">Даю согласие на обработку персональных данных</span>
                        </div>
                        <button className="buttonform">
                            <span className="buttontext">Отправить</span>
                            <svg id="arrow3" xmlns="http://www.w3.org/2000/svg" width="26" height="5" viewBox="0 0 26 5" fill="none">
                                <path d="M25.1768 2.83693C25.2744 2.7393 25.2744 2.58101 25.1768 2.48338L23.5858 0.892389C23.4882 0.794758 23.3299 0.794758 23.2322 0.892389C23.1346 0.99002 23.1346 1.14831 23.2322 1.24594L24.6464 2.66016L23.2322 4.07437C23.1346 4.172 23.1346 4.33029 23.2322 4.42792C23.3299 4.52555 23.4882 4.52555 23.5858 4.42792L25.1768 2.83693ZM0 2.91016H25V2.41016H0V2.91016Z" fill="#FFFDF5"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Formpage