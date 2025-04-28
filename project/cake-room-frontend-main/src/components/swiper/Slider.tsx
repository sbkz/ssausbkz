import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './slider.scss';
import './Slider-media.scss'

import photo69 from './img/69.jpg';
import photo72 from './img/72.jpg';
import photo74 from './img/74.jpg';
import photo68 from './img/68.jpg';
import photo75 from './img/75.jpg';
import photo67 from './img/67.jpg';




const Slider = () => {

    return(
        <div className="slider">
            <div className="container">
                <h2 className="slider__title">Популярные изделия</h2>
                <Swiper
                    breakpoints={{
                        100: {
                            slidesPerView: 1, 
                            spaceBetween: 40,
                        },
                        75: {
                            slidesPerView: 1, 
                            spaceBetween: 120,
                        },
                        390: {
                            slidesPerView: 1, 
                            spaceBetween: 30,
                        },
                        470: {
                            slidesPerView: 2,
                            spaceBetween: 350,
                        },
                        575: {
                            slidesPerView: 2,
                            spaceBetween: 250,
                        },
                        670: {
                            slidesPerView: 2,
                            spaceBetween: 200,
                        },
                        750: {
                            slidesPerView: 2,
                            spaceBetween: 70,
                        },
                        880: {
                            slidesPerView: 3,
                            spaceBetween: 340,
                        },
                        950: {
                            slidesPerView: 3,
                            spaceBetween: 75,
                        },
                        1040: {
                            slidesPerView: 3,
                            spaceBetween: 200,
                        },
                        1140: {
                            slidesPerView: 3,
                            spaceBetween: 100,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 100,
                        },
                        1920: {
                            slidesPerView: 3,
                            spaceBetween: 100
                        }
                    }}
                    loop={true}
                    speed={4000}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    navigation={false}
                    modules={[Autoplay, Navigation]}
                    className="mySwiper"
                >
                    <SwiperSlide>
                        <Link to="/catalog/67e9492174e0b8075c2707d9">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo69}/>
                            <div className="slider__descr">Торт Тирамису</div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/catalog/67e94a4674e0b8075c2707e3">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo72}/>
                            <div className="slider__descr">Капкейки ассорти</div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/catalog/67e94a8574e0b8075c2707e5">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo74}/>
                            <div className="slider__descr">"Десерт павлова"</div>       
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/catalog/67e9485c74e0b8075c2707d5">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo68}/>
                            <div className="slider__descr">"Чизкейк Нью-Йорк"</div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/catalog/67e94b6f74e0b8075c2707eb">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo75}/>
                            <div className="slider__descr">"Круассаны ассорти"</div>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to="/catalog/67e9476774e0b8075c2707d1">
                            <img className="slider__photo" alt="sliderPhoto"  src={photo67}/>
                            <div className="slider__descr">"Печенье макаронс ассорти"</div>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    )
}
export default Slider;