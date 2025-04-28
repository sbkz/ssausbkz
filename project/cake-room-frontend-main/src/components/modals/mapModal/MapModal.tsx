import { useAppDispatch, useAppSelector } from "../../../hooks/redux";


import YandexMap from "../../YandexMap/YandexMap";
import closeIcon from '../../../resources/icons/mapModal/closeIcon.svg';
import { closeModal } from "../../../store/mapModalSlice";

import './MapModal.scss';
import './MapModal-media.scss';





const MapModal = () => {
    
    const mapModalState = useAppSelector(state => state.mapModalState.mapModalCondition);
    const dispatch = useAppDispatch();

    return(
        <div 
            onClick={() => dispatch(closeModal())}
            className="mapModal" 
            style={{
                display: mapModalState? "flex": "none",
            }}>
            <div className="mapModal__window" onClick={(e) => e.stopPropagation()}>
                <div className="mapModal__window_infoBlock">
                    <div className="mapModal__window_infoBlock-adress">
                        <span>Мы находимся:</span><br />Московское шоссе, 34
                    </div>
                    <div className="mapModal__window_infoBlock-shedule">
                        <div className="shedule__days">
                            <div>Понедельник</div>
                            <div>Вторник</div>
                            <div>Среда</div>
                            <div>Четверг</div>
                            <div>Пятница</div>
                            <div>Суббота</div>
                            <div>Воскресенье</div>
                        </div>
                        <div className="shedule__times">
                            <div>7:00-18:00</div>
                            <div>7:00-18:00</div>
                            <div>7:00-18:00</div>
                            <div>7:00-18:00</div>
                            <div>Выходной</div>
                            <div>Выходной</div>
                            <div>7:00-18:00</div>
                        </div>
                    </div>
                    <div className="mapModal__window_infoBlock-describe">Мы ваc ждём!</div>
                </div>
                <div className='yandexMap'>
                    <YandexMap />
                </div>
                <img onClick={() => dispatch(closeModal())} alt="closeIcon" src={closeIcon} className="mapModal__window_close"/>
            </div>
        </div>
    )
}
export default MapModal

