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
            <div className='headerInput'>
                <AiOutlineSearch style={{fontSize : 20}}/>
                <input type="text" className='inputSearch' placeholder='Поиск' style={{fontSize : 20}}/>
            </div>
            <div className='headerProfile'>
                <CgProfile style={{fontSize : 20}}/>
            </div>
            <div className='headerFavorites'>
                <AiOutlineHeart style={{fontSize : 20}}/>
            </div>
            <div className='headerBasket'>
                <BsCart2 style={{fontSize : 20}}/>
            </div>
        </div>
    )
}

export default Header
