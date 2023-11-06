import "./Formpage.modules.css"

const Formpage = () => {
    return (
        <div className="Formpage">
            <div className="Form">
                <div className="form">
                    <div className="formtext">
                        <p id="text">Приглашаем  к сотрудничеству производителей и поставщиков одежды, обуви и аксессуаров</p>
                    </div>
                    <div className="others">
                        <div>
                            <input className="forminput" type="text" placeholder="Ваше имя"/>
                        </div>
                        <div>
                            <input className="forminput" type="number" placeholder="Номер телефона"/>
                        </div>
                        <div>
                            <input className="forminput" type="text" placeholder="Электронная почта"/>
                        </div>
                        <div className="InputCheck">
                            <input className="inputcheck" type="checkbox"/>
                            <p className="inputtext">Даю согласие на обработку персональных данных</p>
                        </div>
                        <button className="buttonform">
                            <p className="buttontext">Отправить</p>
                            <img src="./img/Arrow11.svg" alt="arrow" srcset="" id="Arrow11"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Formpage