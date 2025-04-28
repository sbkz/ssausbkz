import { useState, useEffect  } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

import ProductCard from "../../catalogCard/CatalogCard";
import { fetchProducts, fetchSumProducts} from "../../../store/catalogSlice";

import Spinner from '../../spinner/Spinner';
import error503 from '../../../resources/img/catalogPage/error503.jpg';

import './CatalogPage.scss'
import './CatalogPage-media.scss'

const CatalogPage = () => {
    
    const dispatch = useAppDispatch();

    const {dataCatalog, catalogError, isLoading} = useAppSelector(state => state.catalogStates);

    useEffect(() => {
        dispatch(fetchProducts(0))
        dispatch(fetchSumProducts())
    },[dispatch])

    return(
        <>
            <div className="catalog">
                <div className="container">
                    <h1 className="catalog__title">Каталог товаров</h1>
                    <div className="catalog__products-wrapper">
                        {isLoading ? <Spinner /> : ''}
                        {catalogError ? <img alt="error503" style={{width: '80%'}} src={error503} /> : ""}
                        {dataCatalog.map((product) => {
                            return (
                                product.isActive?
                                <div key={product._id} className="catalog__products_item">
                                    <ProductCard product={product} />
                                </div>
                                :
                                ''
                            )
                        })} 
                    </div>
                </div>  
            </div>
        </>
    )
}
export default CatalogPage