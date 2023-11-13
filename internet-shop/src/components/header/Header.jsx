import "./Header.modules.css"
import { CiMenuBurger } from 'react-icons/ci'
import { AiOutlineSearch } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsCart2 } from 'react-icons/bs'
import { useEffect, useState } from "react";
import ModalMenu from "../modal/ModalMenu"
import ModalAccauntPreview from "../modal/ModalAccauntPreview"
import ModalAccaunt from "../modal/ModalAccaunt"

const Header = () => {

    const [showModalMenu, setShowModalMenu] = useState(false);
    const [showModalAccauntPreview, setShowModalAccauntPreview] = useState(false);
    const [auth, setAuth] = useState(false);
    
    useEffect(() => {
        const authStatus = JSON.parse(localStorage.getItem("auth"));
        setAuth(authStatus);
    }, [])

    return (
        <section className='header'>
            <div className='headerMenu'>
                <CiMenuBurger id="modalmenu" style={{ fontSize: 36 }} onClick={() => setShowModalMenu(!showModalMenu)} />
                {showModalMenu ? <ModalMenu /> : null}
            </div>
            <div className='headerOther'>
                <AiOutlineSearch style={{ fontSize: 20 }} id="headerInput" />
                <input type="text" className='inputSearch' placeholder='Поиск' style={{ fontSize: 20 }} />
                <CgProfile style={{ fontSize: 20 }} id="headerProfile" onClick={() => setShowModalAccauntPreview(!showModalAccauntPreview)} />
                {auth ? (
                    showModalAccauntPreview ? <ModalAccaunt /> : null) 
                    :
                    (showModalAccauntPreview ? <ModalAccauntPreview /> : null)
                }
                <AiOutlineHeart style={{ fontSize: 20 }} id="headerFollowed" />
                <BsCart2 style={{ fontSize: 20 }} id="headerShops" />
            </div>
        </section>
    )
}

export default Header
