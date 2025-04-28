import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from "../spinner/Spinner";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import OrderSuccessModal from "../modals/orderSuccessModal/OrderSuccessModal";

const Dashboard = () => {
    return (
        <>
            <Header />
                <Suspense fallback={<Spinner />}>
                    <Outlet />
                </Suspense>
            <Footer />
            <OrderSuccessModal />
        </>
    )
}
export default Dashboard;