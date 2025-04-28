import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeErrorModal, closeSuccessModal } from '../store/basketSlice';

const OrderErrorModal: React.FC = () => {
    const dispatch = useDispatch();
    const { orderErrorModal, errorMessage } = useSelector((state: any) => state.basketStates);

    if (!orderErrorModal) return null;

    return (
                <div 
                className="orderSuccessModal" 
                onClick={() => dispatch(closeErrorModal())}
                style={{
                    display: orderErrorModal? "flex": "none",
                }}
                >
                    <div className="orderSuccessModal__window" onClick={(e) => e.stopPropagation()}>
                        <div className="orderSuccessModal__window_title">
                        {errorMessage}
                        </div>
                    </div>
                </div>
    );
};

export default OrderErrorModal; 