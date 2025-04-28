import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { addItem } from "../../store/basketSlice";

import './CatalogCard.scss';
import './CatalogCard-media.scss';


import inBasket from '../../resources/icons/productCard/tip.svg';
import cardBasket from '../../resources/icons/productCard/cardbasket.svg';
import { productType } from "../../modelTypes/catalogTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { PHOTO_PATH } from "../../utils/constants";

type productObjType = {
    product: productType
}


const CatalogCard: React.FC<productObjType> = ({product}) => {
    
    const [basketStatus, setBasket] = useState<boolean>();

    const {basketItems} = useAppSelector(state => state.basketStates);
    const dispatch = useAppDispatch();
    const[ linkToBasket, setLink ] = useState(false)

    const {photoPath,_id,title, price} = product;

    useEffect(() => {
        if(basketItems.find(item => item._id === _id)){
            setBasket(true)
        }else{
            setBasket(false)
        }
    },[basketItems, _id])

    const productPrice = Math.round(price)

    return(
        <>
            <div className="card__wrapper">
                <Link to={`${_id}`}>
                    <img src= {`${PHOTO_PATH}/${photoPath}`} alt={`img number-${_id}`} className="card__img" />
                </Link>
                <div className="card__describe">
                    <Link to={`${_id}`} className="card__describe_name">{title}</Link>
                </div>
                <div className="card__footer">
                    <div className="card__footer_price">{productPrice} руб/кг</div>
                    <div className="card__footer_basket">
                        {basketStatus ? <img className="card__footer_basket-icon card__footer_basket-inBasket" alt="cardBasket" src={inBasket}/> : <img onClick={() => dispatch(addItem(product))} className="card__footer_basket-icon" alt="cardBasket" src={cardBasket}/>}
                        {basketStatus ?
                            <Link to='/basket' className="card__footer_basket-title" 
                            onMouseOver={() => setLink(true)}
                            onMouseOut={() => setLink(false)}
                            style={{
                                color: linkToBasket ? '#006800': '#000'
                            }}
                            > {linkToBasket ? 'В корзину': 'В корзине'} </Link>
                            :
                            <div onClick={() => dispatch(addItem(product))} className="card__footer_basket-title">В корзину</div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default CatalogCard