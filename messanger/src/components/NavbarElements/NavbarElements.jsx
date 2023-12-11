import './NavbarElements.modules.css'
import {NavLink} from "react-router-dom"

const NavbarElements = () => {
    return(
        <nav>
            <div id="navbarElements">
                <div id="profile">
                    <div id="photo">
                        <img src="./img/profile.svg" alt="home" width={64} height={64}/>
                    </div>
                    <div id="nameandsurname">
                        <span id="name">Henry</span>
                        <span id="surname">Jabbawockiez</span>
                    </div>
                </div>
                <div id="navbarHome">
                    <img src="./img/grid.svg" alt="home" />
                    <NavLink to="/home"  className='home'>
                        <h1>Home</h1>
                    </NavLink>
                </div>
                <div id="navbarChat">
                    <img src="./img/message-circle.svg" alt="chat" />
                    <NavLink to="/chat"  className='chat'>
                        <h1>Chat</h1>
                    </NavLink>
                </div>
                <div id="navbarContacts">
                    <img src="./img/person.svg" alt="person" />
                    <NavLink to="/contacts"  className='contacts'>
                        <h1>Contacts</h1>
                    </NavLink>
                </div>
                <div id="navbarNotification">
                    <img src="./img/bell.svg" alt="bell" />
                    <NavLink to="/notification"  className='notification'>
                        <h1>Notifikation</h1>
                    </NavLink>
                </div>
                <div id="navbarCalendar">
                    <img src="./img/calendar.svg" alt="calendar" />
                    <NavLink to="/calendar"  className='calendar'>
                        <h1>Calendar</h1>
                    </NavLink>
                </div>
                <div id="navbarSettings">
                    <img src="./img/settings-2.svg" alt="settings" />
                    <NavLink to="/settings"  className='settings'>
                        <h1>Settings</h1>
                    </NavLink>
                </div>
                <div id="navbarLogout">
                    <img src="./img/power.svg" alt="power"/>
                    <h1>Log Out</h1>
                </div>
            </div>
        </nav>
    )
}

export default NavbarElements