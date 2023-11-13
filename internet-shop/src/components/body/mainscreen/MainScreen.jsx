import "./MainScreen.modules.css"

const MainScreen = () => {
  return (
    <section className="main">
      <div className="Rectangle">
        <div className="Rectangle22">
          <img src="./img/Reactangle22.jpg" alt="shirt" srcset="" id="Rectangle22"/>
        </div>
        <div className="Rectangle21"> 
          <img src="./img/Reactangle21.jpg" alt="jeans" srcset="" id="Rectangle21"/>
        </div>
      </div>
      <div className="Hellotext">
        <span id="hello1">Добро пожаловать <br/> в <span id="none"></span>
          <span id="hello2">Cokteil</span>
        </span>
      </div>
      <div className="Titletext">
        <span id="title1">Экономим Ваше время! <br />
        Предлагаем лучшие цены! <br />
        Доставляем в кротчайшие сроки!</span>
      </div>
      <div className="Circle">
        <div id="Circle">
          <span id="circle1">Каталог</span>
          <svg id="arrow1" xmlns="http://www.w3.org/2000/svg" width="80" height="8" viewBox="0 0 80 8" fill="none">
            <path d="M79.3536 4.35355C79.5488 4.15829 79.5488 3.84171 79.3536 3.64645L76.1716 0.464466C75.9763 0.269204 75.6597 0.269204 75.4645 0.464466C75.2692 0.659728 75.2692 0.976311 75.4645 1.17157L78.2929 4L75.4645 6.82843C75.2692 7.02369 75.2692 7.34027 75.4645 7.53553C75.6597 7.7308 75.9763 7.7308 76.1716 7.53553L79.3536 4.35355ZM0 4.5H79V3.5H0V4.5Z" fill="#514A7E"/>
          </svg>
        </div>
      </div>
    </section>
  )
}
export default MainScreen