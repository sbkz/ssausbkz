import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import MapModal from '../modals/mapModal/MapModal';
import Menu from '../menu/Menu';
import LoginModal from '../modals/loginModal/LoginModal';

import { openMenu } from '../../store/menuSlice';
import { openModal } from '../../store/mapModalSlice';

import cityIcon from '../../resources/icons/header/city.svg';
import phoneIcon from '../../resources/icons/header/phoneicon.svg';
import basketIcon from '../../resources/icons/header/basketicon.svg';
import burgerIcon from '../../resources/icons/header/burgericon.svg'
import logo from '../../resources/icons/header/logo2.png';
import enterAccIcon from '../../resources/icons/header/eneteraccount.svg';

import './Header.scss';
import './Header-media.scss';
import { openLoginModal } from '../../store/loginSlice';





function Header() {
    
    const dispatch = useAppDispatch();
    const {totalQuantity} = useAppSelector(state => state.basketStates);
    

    return(
        <>
            <div className="header" id='header'>
            <Menu />
                <div className="header__divider">
                    <div className="container">
                        <div className="header__top">
                            <div className='header__top_wrapper'>
                                <div className="header__top_elem">
                                    <img className='header__top_cityIcon' onClick={() => dispatch(openModal())} src={cityIcon} alt='cityIcon'/>
                                    <div className="header__top_tag" onClick={() => dispatch(openModal())}>Самара..</div>
                                </div>
                                <div className="header__top_elem">
                                    <a href="tel: 78000000000" className="header__top_phoneIcon">
                                        <img className='header__top_phoneIcon' src={phoneIcon} alt='phoneIcon'/>
                                    </a>
                                    <a href="tel: +78000000000" className="header__top_tag">8 800 000 00 00</a>
                                </div>
                                <div className="header__top_elem header__top_elem-accBusket">
                                    <Link to='/basket' className="header__top_basketIcon">
                                        <img className='header__top_basketIcon' src={basketIcon} alt='basketIcon'/>
                                        <div className="header__top_basketIcon-counter">{totalQuantity}</div> 
                                    </Link>
                                    <div className='header__top_enterAccIcon'>
                                        <img src={enterAccIcon} alt="enter in acc" onClick={() => dispatch(openLoginModal())}/>
                                    </div>
                                </div>
                            </div>
                            <img onClick={() => dispatch(openMenu())} className='header__top_burgerIcon' alt='burgerIcon' src={burgerIcon}/>
                        </div>
                    </div>
                </div>
                <div className="header__main">
                    <div className="container">
                        <nav className="header__main_wrapper">
                                <NavLink to="/deliveryAndPayment" className="header__main_item">Доставка и оплата</NavLink>
                                <NavLink to='/contacts' className="header__main_item">Контакты</NavLink>
                                <Link to='/' className='header__main_item'><img className='header__main_logo' src={logo} alt='logo'/></Link>
                                <NavLink to="/vacancy" className="header__main_item">Вакансии</NavLink>
                                <NavLink to="/catalog" end className="header__main_item">каталог товаров</NavLink>
                        </nav>
                    </div>
                </div>
            </div>
            <MapModal />
            <LoginModal />
        </>
        )
}
export default Header
