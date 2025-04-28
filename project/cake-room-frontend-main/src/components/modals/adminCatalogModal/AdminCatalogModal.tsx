import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import closeModal from '../../../resources/icons/adminModals/closeIcon.svg';
import { closeCatalogModal, updateProduct } from '../../../store/adminSlice';  
import { useState, useEffect } from 'react';

import './AdminCatalogModal.scss';

const AdminCatalogModal = () => {
    const { isCatalogModalOpen, changingProduct } = useAppSelector(store => store.adminState);
    const dispatch = useAppDispatch();

    const { title, price, photoPath, _id, description, isActive, box_weight } = changingProduct;

    const [productTitle, setProductTitle] = useState(title);
    const [requiredTitle, setRequiredTitle] = useState(true);
    const [productPrice, setProductPrice] = useState(price);
    const [requiredPrice, setRequiredPrice] = useState(true);
    const [productDescription, setProductDescription] = useState(description);
    const [requiredDescription, setRequiredDescription] = useState(true);
    const [isProductActive, setProductActive] = useState(isActive);
    const [productBoxWeight, setProductBoxWeight] = useState(box_weight);

    useEffect(() => {
        setProductTitle(title);
        setProductPrice(price);
        setProductDescription(description);
        setProductActive(isActive);
        setProductBoxWeight(box_weight);
    }, [changingProduct, title, price, description, isActive, box_weight]);

    const onSubmitProduct: React.MouseEventHandler<HTMLButtonElement> = async () => {
        const updatedProduct = {
            ...changingProduct,
            title: productTitle,
            price: productPrice,
            description: productDescription,
            isActive: isProductActive,
            box_weight: productBoxWeight
        };

        if(productPrice > 0 && productTitle.trim() !== '' && productDescription.trim() !== ''){
            await dispatch(updateProduct(updatedProduct));
            dispatch(closeCatalogModal());
        } else {
            (productPrice <= 0) ? setRequiredPrice(false) : setRequiredPrice(true);
            (productTitle.trim() === '') ? setRequiredTitle(false) : setRequiredTitle(true);
            (productDescription.trim() === '') ? setRequiredDescription(false) : setRequiredDescription(true);
        }
    }
    
    return (
        <div 
            className="adminCatalogModal"
            style={{display: isCatalogModalOpen ? 'flex' : 'none'}}
            onClick={() => dispatch(closeCatalogModal())}
        >
            <div className="adminCatalogModal__settings" onClick={(e) => e.stopPropagation()}>
                <img src={closeModal} alt="close modal" onClick={() => dispatch(closeCatalogModal())} className="adminCatalogModal__close" />
                <div className="adminCatalogModal__title">Настройки продукта</div>
                <div className="adminCatalogModal__wrapper">
                    <label htmlFor="product_input_title">Название <span style={{color: requiredTitle ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <input
                        type="text"
                        className='settings__input settings__input_title'
                        id='product_input_title'
                        value={productTitle}
                        onChange={(e) => {
                            setProductTitle(e.target.value)
                            setRequiredTitle(true)
                        }}
                        style={{border: requiredTitle ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <label htmlFor="product_input_price">Цена <span style={{color: requiredPrice ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <input 
                        type="number"
                        className='settings__input settings__input_price'
                        id='product_input_price'
                        value={productPrice}
                        onChange={(e) => {
                            setProductPrice(Number(e.target.value))
                            setRequiredPrice(true)
                        }}
                        style={{border: requiredPrice ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <label htmlFor="product_input_box_weight">Вес коробки (кг)</label>
                    <input 
                        type="number"
                        className='settings__input settings__input_box_weight'
                        id='product_input_box_weight'
                        value={productBoxWeight}
                        onChange={(e) => setProductBoxWeight(Number(e.target.value))}
                    />
                    <label htmlFor="product_input_description">Описание <span style={{color: requiredDescription ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <textarea
                        className='settings__input settings__input_description'
                        id='product_input_description'
                        value={productDescription}
                        onChange={(e) => {
                            setProductDescription(e.target.value)
                            setRequiredDescription(true)
                        }}
                        style={{border: requiredDescription ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <div className="adminCatalogModal__active">
                        <label htmlFor="product_active">Активен</label>
                        <input
                            type="checkbox"
                            id="product_active"
                            checked={isProductActive}
                            onChange={(e) => setProductActive(e.target.checked)}
                        />
                    </div>
                    <button onClick={onSubmitProduct} className="adminCatalogModal__submit">Сохранить</button>
                </div>
            </div>
        </div>
    )
}

export default AdminCatalogModal; 