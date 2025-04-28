import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import Spinner from "../components/spinner/Spinner";

type adminRouteTypes = {
    children: JSX.Element 
}

const AdminRoute = ({children}: adminRouteTypes) => {
    const { role, isLoading, isAuth } = useAppSelector(store => store.loginStates)

    if (isLoading) {
        return <div className='spinner__wrapper'><Spinner /></div>
    }

    if(!isAuth || role !== 'admin'){
        return <Navigate to='/' />
    }

    return children
}

export default AdminRoute