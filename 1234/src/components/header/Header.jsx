import "./Header.modules.css"
import { CiMenuBurger } from 'react-icons/ci'
import {AiOutlineSearch} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
import { AiOutlineHeart } from 'react-icons/ai'
import {BsCart2} from 'react-icons/bs'

const Header = () => {
    return(
        <div className='header'>
            <div className='headerMenu'>
                <CiMenuBurger style={{fontSize : 36}}/>
            </div>
            <div className='headerOther'>
                <AiOutlineSearch style={{fontSize : 20}} id="headerInput"/>
                <input type="text" className='inputSearch' placeholder='Поиск' style={{fontSize : 20}}/>
                <CgProfile style={{fontSize : 20}} id="headerProfile"/>
                <AiOutlineHeart style={{fontSize : 20}} id="headerFollowed"/>
                <BsCart2 style={{fontSize : 20}} id="headerShops"/>
            </div>
        </div>
    )
}

export default Header
