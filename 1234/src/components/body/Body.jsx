import "./Body.modules.css"
import Reactangle22 from "../../img/Reactangle22.jpg";
import Reactangle21 from "../../img/Reactangle21.jpg";

const Body = () => {
  return (
    <div className="body">
      <div className="Rectangle22">
        <img src={Reactangle22} alt="shirt" srcset="" id="Rectangle22"/>
      </div>
      <div className="Rectangle21"> 
        <img src={Reactangle21} alt="jeans" srcset="" id="Rectangle21"/>
      </div>
      <div className="title">
          <h1 id="text1">Добро пожаловать <br/> в <h1 id="none"> </h1>
            <h1 id="text2">corteil</h1>
          </h1>
      </div>
      <div className="text">
        <div className="text3">
          <h1>Экономим Ваше время!</h1>
        </div>
        <div className="text4">
          <h1>Предлагаем лучшие цены!</h1>
        </div>
        <div className="text5">
          <h1>Доставляем в кротчайшие сроки!</h1>
        </div>
      </div>
    </div>
  )
}
 export default Body
