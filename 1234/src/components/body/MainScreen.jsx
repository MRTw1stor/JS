import "./MainScreen.modules.css"
import Reactangle22 from "../../img/Reactangle22.jpg";
import Reactangle21 from "../../img/Reactangle21.jpg";
import Arrow from "../../img/Arrow8.svg"

const MainScreen = () => {
  return (
    <div className="body">
      <div className="Rectangle22">
        <img src={Reactangle22} alt="shirt" srcset="" id="Rectangle22"/>
      </div>
      <div className="Rectangle21"> 
        <img src={Reactangle21} alt="jeans" srcset="" id="Rectangle21"/>
      </div>
      <div className="Hellotext">
          <h1 id="hello1">Добро пожаловать <br/> в <h1 id="none"></h1>
            <h1 id="hello2">Cokteil</h1>
          </h1>
      </div>
      <div className="Titletext">
        <div className="title">
          <h1 id="title1">Экономим Ваше время! <br />
          Предлагаем лучшие цены! <br />
          Доставляем в кротчайшие сроки!</h1>
        </div>
      </div>
      <div className="Circle">
        <h1 id="title2">Каталог</h1>
        <img src={Arrow} alt="arrow" srcset="" id="Arrow"/>
      </div>
    </div>
  )
}
 export default MainScreen
