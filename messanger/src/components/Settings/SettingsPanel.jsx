import "./SettingsPanel.modules.css"

const SettingsPanel = () => {
    return(
        <div id="settingsPanel">
            <div id="settingstext">
                <span id="Settings">Settings</span>
            </div>
            <div id="settingsother">
                <div id="createnewname">
                    <span id="newname">Введите новое имя</span>
                    <input id="newnameunput" type="text" />
                    <button id="newnamebutton">Поменять имя</button>
                </div>
                <div id="createnewsurname">
                    <span id="newsurname">Введите новую фамилию</span>
                    <input id="newsurnameunput" type="text" />
                    <button id="newsurnamebutton">Поменять фамилию</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsPanel