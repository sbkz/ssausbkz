import React, { useEffect, useState } from "react";
import { addItem, removeItem, deleteItem, setInputState} from "../../store/basketSlice";
import { Link } from "react-router-dom";

import removeIcon from '../../resources/icons/basketCard/removeicon.svg';

import './BasketCard.scss';
import './BasketCard-media.scss';
import { useAppDispatch } from "../../hooks/redux";
import { basketItemType } from "../../modelTypes/basketTypes";
import { PHOTO_PATH } from "../../utils/constants";

type basketPropsType = {
    basketItem: basketItemType
}

const BasketCard: React.FC<basketPropsType> = ({basketItem}): JSX.Element => {

    const dispatch = useAppDispatch();
    const [quantityValue,setValue] = useState<number>(1);

    const {_id, totalPrice, quantity, title, photoPath} = basketItem;
    
    useEffect(() => {
        setValue(quantity)
    }, [quantity])



    const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
            const {value} = event.target;
            const filtredValue = value.replace(/[,.]/g,"");

            setValue(+filtredValue)
    }

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement>= (event) => {
        const combineFunc = (qua: number | string) => {
            dispatch(setInputState({quantitySum: qua, id: _id}))
        }

        const {value} = event.target;
        
        if(Number(value) === 0 || value === '' || Number(value) < 0){
            setValue(1)
            combineFunc(1)
        }else{
            setValue(+value.replace(/^0+/,""))
            combineFunc(value)
        }

}

    return (
        <div className="basketCard">
            <img src={removeIcon} alt="remove icon" className="basketCard__remove" onClick={() => dispatch(deleteItem(_id))}/>
            <Link to={`/catalog/${_id}`} className="basketCard__img"><img src={`/${PHOTO_PATH}/${photoPath}`} alt="product" className="basketCard__img" /></Link>
            <div className="basketCard__infoBlock">
            <Link to={`/catalog/${_id}`} className="basketCard__infoBlock_title">{title}</Link>
                <div className="basketCard__infoBlock-wrapper">
                    <div className="basketCard__infoBlock_amount">
                    <div onClick={quantityValue === 1 ? () => {} : () => dispatch(removeItem(_id))}className="basketCard__infoBlock_amount-dec">-</div>
                        <div className="basketCard__infoBlock_amount-sum"> 
                            <input 
                            value={quantityValue}
                            onChange={onChangeHandler}
                            onBlur={onBlurHandler}
                            type="number"
                            required/> 
                        </div>
                        <div onClick={() => dispatch(addItem(basketItem))} className="basketCard__infoBlock_amount-inc">+</div>
                    </div>
                    <div className="basketCard__infoBlock_price">Цена: <span>{totalPrice} руб.</span></div>
                </div>
            </div>
        </div>
    )
}   
export default BasketCard