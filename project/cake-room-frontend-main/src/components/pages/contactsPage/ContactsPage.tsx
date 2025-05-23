import React from "react";

import logo from '../../../resources/img/contacts/logo_img.png';
import phone from '../../../resources/icons/contactsPage/phone.svg';
import emailIcon from '../../../resources/icons/contactsPage/email.svg';
import viber from '../../../resources/icons/contactsPage/viber.svg';

import './contactsPage.scss';
import './contactPage-media.scss';

const ContactsPage = () => {

    return (
        <>
            <div className="contact">
                <div className="container"> 
                    <div className="contacts">
                        <h1 className="contacts-info__title">Контакты</h1>
                        <div className="contacts-logo">
                            <img src={logo} alt="logo"/>
                        </div>

                        <div className="contacts-info">
                            <div className="contacts-info-block">
                                <h3 className="contacts-info__subtitle contacts-info__subtitle_shedule">Режим работы:</h3>
                                <div className="contacts-info_working">
                                    <div className="contacts-info_working-days">
                                        <p>Понедельник</p>
                                        <p>Вторник</p>
                                        <p>Среда</p>
                                        <p>Четверг</p>
                                        <p>Пятница</p>
                                        <p>Суббота</p>
                                        <p>Воскресенье</p>
                                    </div>
                                    <div className="contacts-info_working-hours">
                                        <p>7:00-18:00</p>
                                        <p>7:00-18:00</p>
                                        <p>7:00-18:00</p>
                                        <p>7:00-18:00</p>
                                        <p>Выходной</p>
                                        <p>Выходной</p>
                                        <p>7:00-18:00</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contacts-info-block">
                                <h3 className="contacts-info__subtitle">Пункты самовывоза:</h3>
                                <p className="contacts-info__descr">Московское шоссе, 34</p>
                            </div>

                            <div className="contacts-info-block">
                                <h3 className="contacts-info__subtitle">Связаться:</h3>
                                <p className="contacts-info__descr contacts-info__descr_links">
                                    <img className="contacts-info__descr_img contacts-info__descr_img-phone" src={phone} alt="phone" />
                                    <a href="tel:+78000000000">+7 (800) 000-00-00</a>
                                </p>
                                <p className="contacts-info__descr contacts-info__descr_links">
                                    <img className="contacts-info__descr_img contacts-info__descr_img-viber" src={viber} alt="phone" />
                                    <a href="viber://chat?number=%2B78000000000">+7 (800) 000-00-00</a>
                                </p>
                                <p className="contacts-info__descr_img contacts-info__descr contacts-info__descr_links">
                                    <img className="contacts-info__descr_img contacts-info__descr_img-email" src={emailIcon} alt="phone" />
                                    <a href="mailto:thecakeroom@mail.ru">thecakeroom@mail.ru</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactsPage;