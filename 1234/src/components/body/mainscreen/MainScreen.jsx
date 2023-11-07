import "./MainScreen.modules.css"

const MainScreen = () => {
  return (
    <div className="main">
      <div className="Rectangle22">
        <img src="./img/Reactangle22.jpg" alt="shirt" srcset="" id="Rectangle22"/>
      </div>
      <div className="Rectangle21"> 
        <img src="./img/Reactangle21.jpg" alt="jeans" srcset="" id="Rectangle21"/>
      </div>
      <div className="Hellotext">
          <p id="hello1">Добро пожаловать <br/> в <p id="none"></p>
            <p id="hello2">Cokteil</p>
          </p>
      </div>
      <div className="Titletext">
        <div className="title">
          <p id="title1">Экономим Ваше время! <br />
          Предлагаем лучшие цены! <br />
          Доставляем в кротчайшие сроки!</p>
        </div>
      </div>
      <div className="Circle">
        <p id="title2">Каталог</p>
        <img src="./img/Arrow8.svg" alt="arrow" srcset="" id="Arrow8"/>
      </div>
    </div>
  )
}

export default MainScreen