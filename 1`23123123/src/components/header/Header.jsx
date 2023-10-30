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
                <CiMenuBurger/>
            </div>
            <div className='headerInput'>
                <AiOutlineSearch />
                <input type="text" className='inputSearch' placeholder='Поиск'/>
            </div>
            <div className='headerProfile'>
                <CgProfile />
            </div>
            <div className='headerFavorites'>
                <AiOutlineHeart />
            </div>
            <div className='headerBasket'>
                <BsCart2 />
            </div>
        </div>
    )    
}

export default Header