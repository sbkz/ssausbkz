import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { checkAuth } from '../../store/loginSlice';
import Spinner from '../spinner/Spinner';
import AdminRoute from '../../privateRoutes/adminRoute';
import OrderErrorModal from '../OrderErrorModal';

import Dashboard from '../dashboard/Dashboard';
import MainPage from '../pages/mainPage/MainPage';
import DeliveryAndPaymentPage from '../pages/deliveryAndPaymentPage/DeliveryAndPaymentPage';
import ContactsPage from '../pages/contactsPage/ContactsPage';
import VacancyPage from '../pages/vacancyPage/VacancyPage';
import VacancyInfoPage from '../pages/vacancyInfoPage/VacancyInfoPage';
import CatalogPage from '../pages/catalogPage/CatalogPage';
import BasketPage from '../pages/basketPage/BasketPage';
import SingleProductPage from '../pages/singleProductPage/SingleProductPage';
import Page404 from '../pages/404';
import AdminPage from '../pages/adminPage/AdminPage';
import AdminCatalogPage from '../pages/adminCatalogPage/AdminCatalogPage';
import AdminVacancyPage from '../pages/adminVacancyPage/AdminVacancyPage';

const App = () => {
    
    const {isAuth,isLoading} = useAppSelector(store => store.loginStates);
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(localStorage.getItem('token')){
           dispatch(checkAuth())
        }
    }, [dispatch])

    console.log(isAuth)
    if(isLoading) {
        return <div className='spinner__wrapper'><Spinner /></div>
    }
    return(
        <Router>
                <Routes>
                    <Route path='/' element={<Dashboard />}>
                        <Route index element={<MainPage/>}/>
                        <Route path="deliveryAndPayment" element={<DeliveryAndPaymentPage />} />
                        <Route path="contacts" element={<ContactsPage />} />
                        <Route path="vacancy" element={<VacancyPage />} />
                        <Route path="vacancy/:id" element={<VacancyInfoPage />} />
                        <Route path="catalog" element={<CatalogPage />} />
                        <Route path="basket" element={<BasketPage />} />
                        <Route path="catalog/:id" element={<SingleProductPage />} />
                        <Route path="*" element={<Page404/>} /> 
                        <Route path="adminpanel" element={
                            <AdminRoute>
                                    <AdminPage />
                            </AdminRoute>
                        }/>
                        <Route path="adminpanel/catalog" element={
                            <AdminRoute>
                                    <AdminCatalogPage />
                            </AdminRoute>
                        }/>
                        <Route path="adminpanel/vacancy" element={
                            <AdminRoute>
                                    <AdminVacancyPage />
                            </AdminRoute>
                        }/>
                    </Route>
                </Routes>
            <OrderErrorModal />
        </Router>
    )
}
export default App;