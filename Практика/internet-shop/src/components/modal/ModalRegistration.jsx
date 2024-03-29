import "./ModalRegistration.modules.css"
import { useState } from "react"
import ModalEntry from "./ModalEntry"

const ModalRegistration = () => {
    
    const [disableModalRegistration, setDisableModalRegistration] = useState(false);
    const [showModalEntry, setShowModalEntry] = useState(false);
    const [FIO, setFIO ] = useState('');
    const [adress, setAdress ] = useState('');
    const [phone, setPhone ] = useState('');
    const [email, setEmail] = useState('');
    const [index, setIndex] = useState('');
    const [password, setPassword] = useState('');
    const [check, setCheck ] = useState(false);

    const userItem = {
        FIO: FIO,
        adress: adress,
        phone: phone,
        email: email,
        index: index,
        password: password
    };

    const onRegister = () => {
        if(!check) return;
        localStorage.setItem("user", JSON.stringify(userItem));
    };

    return (
        <section className={disableModalRegistration ? "modalregistration_close" : null}>
            <div className={showModalEntry ? "modalregistration_close" :"modalregistration"}>
                <div id="elipseregistration"></div>
                <div id="otherregistration">
                    <div id="formregistration">
                        <div id="closeregistration" onClick={() => setDisableModalRegistration(!disableModalRegistration)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M10.7831 9.99993L15.3887 5.39438C15.4797 5.2881 15.5272 5.15139 15.5218 5.01157C15.5164 4.87175 15.4585 4.73912 15.3595 4.64017C15.2606 4.54123 15.128 4.48327 14.9881 4.47787C14.8483 4.47247 14.7116 4.52003 14.6053 4.61104L9.99977 9.2166L5.39421 4.60549C5.2896 4.50087 5.14771 4.4421 4.99977 4.4421C4.85182 4.4421 4.70994 4.50087 4.60532 4.60549C4.50071 4.7101 4.44194 4.85199 4.44194 4.99993C4.44194 5.14788 4.50071 5.28976 4.60532 5.39438L9.21643 9.99993L4.60532 14.6055C4.54717 14.6553 4.49993 14.7166 4.46659 14.7855C4.43324 14.8544 4.4145 14.9295 4.41155 15.006C4.40859 15.0825 4.42148 15.1588 4.44941 15.2301C4.47734 15.3014 4.51971 15.3661 4.57385 15.4203C4.62799 15.4744 4.69274 15.5168 4.76403 15.5447C4.83532 15.5727 4.91162 15.5856 4.98813 15.5826C5.06464 15.5796 5.13972 15.5609 5.20864 15.5276C5.27757 15.4942 5.33885 15.447 5.38866 15.3888L9.99977 10.7833L14.6053 15.3888C14.7116 15.4798 14.8483 15.5274 14.9881 15.522C15.128 15.5166 15.2606 15.4586 15.3595 15.3597C15.4585 15.2607 15.5164 15.1281 15.5218 14.9883C15.5272 14.8485 15.4797 14.7118 15.3887 14.6055L10.7831 9.99993Z" fill="#FFFDF5"/>
                            </svg>
                        </div>
                        <div className="otherregistration">
                            <div className="registrationtext">
                                <span id="registrationtext">Регистрация</span>
                            </div>
                            <div className="inputs">
                                <input id="registrationfio" className="registrationinput" type="text" placeholder="ФИО" onChange={(ev) => setFIO(ev.target.value)}/>
                                <input id="registrationadress" className="registrationinput" type="text" placeholder="Ваш полный адрес" onChange={(ev) => setAdress(ev.target.value)}/>
                            </div>
                            <div className="inputs">
                                <input id="registrationtelephone" className="registrationinput" type="number" placeholder="Контактный телефон" onChange={(ev) => setPhone(ev.target.value)}/>
                                <input id="registrationmail" className="registrationinput" type="text" placeholder="Электронная почта" onChange={(ev) => setEmail(ev.target.value)}/>
                            </div>
                            <div className="inputs">
                                <input id="registrationindex" className="registrationinput" type="number" placeholder="Индекс" onChange={(ev) => setIndex(ev.target.value)}/>
                                <input id="registrationreview" className="registrationinput" type="text" placeholder="Пароль" onChange={(ev) => setPassword(ev.target.value)}/>
                            </div>
                            <div className="inputcheckregistration">
                                <input id="inputcheckregistration" type="checkbox" onClick={() => setCheck(!check)}/>
                                <span className="inputcheckregistrationtext">Даю согласие на обработку персональных данных</span>
                            </div>
                            <div className="registrationbutton">
                                <button id="registrationsent" onClick={onRegister}>
                                    <span id="registrationsenttext">Отправить</span>
                                    <svg id="arrow11" xmlns="http://www.w3.org/2000/svg" width="26" height="4" viewBox="0 0 26 4" fill="none">
                                        <path d="M25.1768 2.17678C25.2744 2.07915 25.2744 1.92085 25.1768 1.82322L23.5858 0.232233C23.4882 0.134602 23.3299 0.134602 23.2322 0.232233C23.1346 0.329864 23.1346 0.488155 23.2322 0.585786L24.6464 2L23.2322 3.41421C23.1346 3.51184 23.1346 3.67014 23.2322 3.76777C23.3299 3.8654 23.4882 3.8654 23.5858 3.76777L25.1768 2.17678ZM0 2.25H25V1.75H0V2.25Z" fill="#FFFDF5"/>
                                    </svg>
                                </button>
                                <button id="registrationenter" onClick={() => setShowModalEntry(!showModalEntry)}>
                                    <span id="registrationentertext">Войти в кабинет</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModalEntry ? <ModalEntry /> : null};
        </section>
    )
}

export default ModalRegistration