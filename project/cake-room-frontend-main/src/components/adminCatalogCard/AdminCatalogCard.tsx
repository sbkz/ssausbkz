import {useState} from 'react';
import { IProduct } from '../../modelTypes/reponses';

import { useAppDispatch } from '../../hooks/redux';
import { onChangeProduct, openCatalogModal } from '../../store/adminSlice';

import './AdminCatalogCard.scss';
import './AdminCatalogCard-media.scss';
import { PHOTO_PATH } from '../../utils/constants';
import { Link } from 'react-router-dom';

interface dataProduct {
    dataProduct: IProduct;
}

const AdminCatalogCard: React.FC<dataProduct> = ({dataProduct}) => {

    const {price, title, _id, isActive, photoPath} = dataProduct;
    console.log(dataProduct)
    const dispatch = useAppDispatch();

    const handleEditClick = () => {
        dispatch(onChangeProduct(dataProduct));
        dispatch(openCatalogModal());
    }

    return(
        <div className="adminCatalogCard">
            <div className="adminCatalogCard__infoWrapper" >
                                <Link to={`${_id}`}>
                                    <img src= {`/${PHOTO_PATH}/${photoPath}`} alt={`img number-${_id}`} className="admin_card__img" />
                                </Link>
                <div>
                    {title}
                </div>
            </div>
            <div className='adminCatalogCard__commit'>
                <button onClick={handleEditClick} className='adminCatalogCard__changeBtn'>Изменить</button>
            </div>
        </div>
    )
}

export default AdminCatalogCard;