import { Link } from 'react-router-dom';

import './AdminPage.scss';
import './AdminPage-media.scss';



const AdminPage: React.FC = () => {



    return(
        <div className="adminPage">
            <div className="container">
                <h1 className="adminPage__title">Админ панель</h1>
                <div className="adminPage__selectPage">
                    <Link to={'/adminpanel/catalog'} className="selectPage__pageLink selectPage__pageLink_catalog">Каталог товаров</Link>
                    <Link to={'/adminpanel/vacancy'} className="selectPage__pageLink selectPage__pageLink_vacancy">Вакансии</Link>
                </div>
            </div>
        </div>
    )
}
export default AdminPage