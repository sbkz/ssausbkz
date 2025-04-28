import { Link } from 'react-router-dom';

import Slider from '../../swiper/Slider';
import Reasons from '../../reasons/Reasons';
import Holidays from '../../holidays/Holidays';
import ErrorBoundary from '../../errorBoundary/ErrorBoundary';

import './mainPage.scss';
import './mainPage-media.scss';

const MainPage = () => {

    return(
        <>
            <div className="promo">
                <div className="container">
                    <div className="promo-block">
                        <div className="promo-block-wrapper">
                            <h1 className="promo-block__title">The Cake Room</h1>
                            <p className="promo-block__since">— 2018 —</p>
                            <p className="promo-block__descr">The Cake Room — это современная кондитерская фабрика, где традиционное мастерство встречается с инновационными подходами в кондитерском искусстве. Мы создаем десерты, которые превращают обычные моменты в особенные воспоминания.</p>
                            <Link to="/catalog" className="mainPage__orderBtn">
                                Оформить заказ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <ErrorBoundary>
                <Slider/>
            </ErrorBoundary>
            
            <Reasons/>
            <Holidays/>
        </>
    )
}
export default MainPage;