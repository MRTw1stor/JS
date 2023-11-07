import "./Questions.modules.css"
import { AiOutlinePlus } from "react-icons/ai";
import {useState} from 'react'
import {questionsItems} from "../../../dates.js"
 
const Questions = () => {
 
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
        <section className="questions">
            <div className="questionstitle">
                <h1 id ="questionstext1">Часто задаваемые вопросы</h1>
                <span id ="questionstext2">FAQ</span>
            </div>
            <div className="questionitems">
                {questionsItems.map((item) => (
                    <div key={item.id} className="questionitem">
                        <div className="elemtitle">
                            <span className="elemtext1">{item.title}</span>
                            {openedIds.includes(item.id.toString()) ? (
                                <AiOutlinePlus id="plus" onClick={() => toggleDescription(item.id.toString())}/>
                            ) : (
                                <AiOutlinePlus onClick={() => toggleDescription(item.id.toString())}/>                            )}
                        </div>
                        <div className="titleelem">
                            {selectedIds.includes(item.id.toString()) && (
                                <span className="elemtext2">{item.text}</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
 
export default Questions;