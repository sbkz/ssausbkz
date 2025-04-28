/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';


import { closeMenu } from '../../store/menuSlice';
import logo from '../../resources/icons/header/logo2.png';
import closeIcon from '../../resources/icons/header/closeIcon.svg';
import muffinIcon from '../../resources/icons/menu/muffinicon.svg';

import './Menu.scss';


const Menu = () => {

    const menuState = useAppSelector(state => state.menuState.menuCondition)
    const dispatch = useAppDispatch();

    return(
        <div className={menuState? 'menu__overlay menu__overlay_active': 'menu__overlay'} >
            <div className={menuState? 'menu menuIsOpen': 'menu'} onClick={() => dispatch(closeMenu())}>
                <div className='menu__wrapper' onClick={e => e.stopPropagation()}>
                    <img src={closeIcon}  alt='close' className='menu__close' onClick={() => dispatch(closeMenu())} />
                    <Link className='menu__logo_linkWrapper' to="/"><img src={logo} alt='logo' className='menu__logo' onClick={() => dispatch(closeMenu())} /></Link>
                    <ul className='menu__nav'>
                        <li className='menu__nav-item' onClick={() => dispatch(closeMenu())}>
                            <NavLink to="/deliveryAndPayment" className="menu__nav_link">
                                <img className='menu__nav_muffin' alt='muffinicon' src={muffinIcon} />
                                <div className='menu__nav-ref'>Доставка и оплата</div>
                            </NavLink>
                        </li>
                        <li className='menu__nav-item' onClick={() => dispatch(closeMenu())}>
                            <NavLink to="/contacts" className="menu__nav_link">
                                <img className='menu__nav_muffin' alt='muffinicon' src={muffinIcon} />
                                <div className='menu__nav-ref'>Контакты</div>
                            </NavLink>
                        </li>
                        <li className='menu__nav-item' onClick={() => dispatch(closeMenu())}>
                            <NavLink to="/vacancy" className="menu__nav_link">
                                <img className='menu__nav_muffin' alt='muffinicon' src={muffinIcon} />
                                <div className='menu__nav-ref'>Вакансии</div>
                            </NavLink>
                        </li>
                        <li className='menu__nav-item' onClick={() => dispatch(closeMenu())}>
                            <NavLink to="/catalog" className="menu__nav_link">
                                <img className='menu__nav_muffin' alt='muffinicon' src={muffinIcon} />
                                <div className='menu__nav-ref'>Каталог товаров</div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Menu