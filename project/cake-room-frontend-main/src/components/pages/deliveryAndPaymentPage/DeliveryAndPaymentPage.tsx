import React from 'react';

import YandexMap from '../../YandexMap/YandexMap';

import bicycle from '../../../resources/img/DeliveryAndPaymentPage/truck.svg';
import logo from '../../../resources/img/DeliveryAndPaymentPage/logo_img.png';

import './deliveryAndPaymentPage.scss';
import './deliveryAndPaymentPage-media.scss';

const DeliveryAndPaymentPage = () => {


    return (
        <>
            <div className="deliveryAndPayment">
                <div className="container">
                    <div className="delivery__block delivery__block_truck">
                        <div className="delivery__block_truck-image"><img src={bicycle} alt="bicycle" /></div>
                        <div className='delivery__block_text'>
                            <h1 className="delivery__block__title">Доставка</h1>
                            <div className="delivery__block__descr">
                                <p> 
                                Мы ценим ваш интерес к нашим продуктам и стремимся обеспечить вас наилучшим обслуживанием.<br/><br/>
                                При оформлении заказа важно учитывать количество товаров, которое вы планируете приобрести.
                                Это связано с нашей политикой доставки, которая зависит от объема вашего заказа.<br />
                                </p>
                            </div>
                        </div>
                    </div>


                    <div className="delivery__block">
                        <div className='delivery__block_text'>
                            <div className="delivery__block__title">Самовывоз</div>
                            <div className="delivery__block__descr">
                                <p>
                                    Вы можете сделать заказ и забрать его самостоятельно с нашего производства по адресу: Московское шоссе, 34.<br /><br />
                                    Небольшие заказы могут быть доступны для самовывоза в тот же день, если соответствующие товары имеются на нашем складе.<br /><br />Если же товары отсутствуют на складе, заказ будет подготовлен к выдаче в течение 1-2 рабочих дней и доступен для самовывоза в пункте приема заказов в указанные часы с 8:00 до 18:00.<br /><br />Сроки выполнения крупных заказов обсуждаются индивидуально.
                                </p>
                            </div>
                        </div>
                        <div className="delivery__block_image"><img src={logo} alt="logo" /></div>
                    </div>
                    <div className='delivery__map'>
                        <YandexMap />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DeliveryAndPaymentPage;