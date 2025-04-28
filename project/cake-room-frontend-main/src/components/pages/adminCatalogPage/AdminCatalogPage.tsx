import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import {useEffect } from 'react'
import AdminCatalogCard from '../../adminCatalogCard/AdminCatalogCard';
import AdminCatalogModal from '../../modals/adminCatalogModal/AdminCatalogModal';

import './AdminCatalogPage.scss';
import './AdminCatalogPage-media.scss';
import { getProducts } from '../../../store/adminSlice';


const AdminCatalogPage: React.FC = () => {



    const dispatch = useAppDispatch()
    const { products } = useAppSelector(store => store.adminState);

    useEffect(() => {
      if(products.length === 0){
        dispatch(getProducts())
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])
    

    return(
        <div className="container">
            <h1 className="adminCatalogPage__title">Настройка каталога</h1>
            <div className="adminCatalogPage__items">
                {products.map((product) => {
                    return(
                        <AdminCatalogCard key={product._id} dataProduct={product}/>
                    )     
                })}
            </div>
            <AdminCatalogModal />
        </div>
    )
}
export default AdminCatalogPage