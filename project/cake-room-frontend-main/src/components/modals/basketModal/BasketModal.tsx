import { Link } from "react-router-dom";

import { closeBasketModal } from "../../../store/basketSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import closeModal from '../../../resources/icons/basketModal/closeIcon.svg'

import './BasketModal.scss';
import './BasketModal-media.scss';


const BasketModal = () => {

    const {basketModal} = useAppSelector(state => state.basketStates);
    const dispatch = useAppDispatch()

    return(
        <div 
        className="basketModal" 
        onClick={() => dispatch(closeBasketModal())}
        style={{
            display: basketModal? "flex": "none",
        }}
        >
            <div className="basketModal__window" onClick={(e) => e.stopPropagation()}>
                <img className="basketModal__closeModal" onClick={() => dispatch(closeBasketModal())} alt="closemodal" src={closeModal}/>
                <div className="basketModal__window_title">В корзине пусто</div>
                <Link className="basketModal__window_linkBtn" to="/catalog" onClick={() => dispatch(closeBasketModal())}>Сделать заказ</Link>
            </div>
        </div>
    )
}
export default BasketModal;