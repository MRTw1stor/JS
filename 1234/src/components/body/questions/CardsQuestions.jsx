import "./CardsQuestions.modules.css"
import { AiOutlinePlus } from "react-icons/ai";
import {useState} from 'react'
 
const CardsQuestions = () => {
    const QuestionsItems = [
        {
            id: 1,
            title: "Как сделать заказ?",
            text: "Чтобы сделать заказ пользователь переходит в каталог сайта, выбирает нужный товар, отпраляет его в коризину, выбрав нужный размер и цвет, и нажимает кнопку “заказать”. Выбирает способ оплаты и доставки и покупает товар. "
        },
        {
            id: 2,
            title: "Способы оплаты",
            text: "Оплата производиться либо при оформлении заказа либо при получении банковской карточкой"
        },
        {
            id: 3,
            title: "Доставка",
            text: "Доставка производиться только в пункты выдачи заказов"
        },
        {
            id: 4,
            title: "Сроки доставки",
            text: "От 3 до 14 дней"
        },
        {
            id: 5,
            title: "Как сделать обмен?",
            text: "Обмен товаров происходит только в пункте выдачи заказов"
        },
        {
            id: 6,
            title: "Как сделать возврат?",
            text: "Возврат осуществляеться только в пункте выдачи заказов"
        },
        {
            id: 7,
            title: "Куда и когда вернутся деньги за возвращённый товар?",
            text: "Деньги вернуться в течении 3-5 дней на карточку с которой был оплачен заказ"
        }
    ];
 
    const [selectedIds, setSelectedIds] = useState([]);;
    const [openedIds, setOpenedIds] = useState([]);;
 
    const toggleDescription = (id) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        };
 
        if (openedIds.includes(id)) {
            setOpenedIds(openedIds.filter((itemId) => itemId !== id));
        } else {
            setOpenedIds([...openedIds, id]);
        };
    };
 
    return (
        <div className="QuestionsItems">
                {QuestionsItems.map((item) => (
                    <div key={item.id} className="itemss">
                        <div className="Title">
                            <p className="titletext">
                                {item.title}
                            </p>
                            {openedIds.includes(item.id.toString()) ? (
                                <AiOutlinePlus id="plus" onClick={() => toggleDescription(item.id.toString())}/>
                            ) : (
                                <AiOutlinePlus onClick={() => toggleDescription(item.id.toString())}/>
                            )}
                        </div>
                        <div className="Text">
                            {selectedIds.includes(item.id.toString()) && (
                                <p className="text">{item.text}</p>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};
 
export default CardsQuestions;