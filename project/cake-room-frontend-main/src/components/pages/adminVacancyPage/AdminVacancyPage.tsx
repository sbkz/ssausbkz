import { useAppSelector, useAppDispatch } from '../../../hooks/redux';
import {useEffect} from 'react'

import './AdminVacancyPage.scss';
import './AdminVacancyPage-media.scss';

import { getVacancies, addNewVacancy, openVacancyModal, onChangeVacancy } from '../../../store/adminSlice';
import AdminVacancyCard from '../../adminVacancyCard/AdminVacancyCard';
import AdminVacancyModal from '../../modals/adminVacancyModal/AdminVacancyModal';


const AdminVacancyPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const { vacancies, isVacancyModalOpen } = useAppSelector(store => store.adminState);


    useEffect(() => {
      if(vacancies.length === 0){
        dispatch(getVacancies())
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])


    return(
        <div className="container">
            {isVacancyModalOpen? <AdminVacancyModal /> : ''}
            <h1 className="adminVacancyPage__title">Настройка вакансий</h1>
            <div className="adminVacancyPage__addVacancy" onClick={() => {
                dispatch(onChangeVacancy({
                    isActive: false,
                    salary: '',
                    title: '',
                    conditions: [],
                    requirements: [],
                    duties: [],
                    description: ''
                }))
                dispatch(addNewVacancy(true));
                dispatch(openVacancyModal())
            }}>Добавить вакансию</div>
            <div className="adminVacancyPage__items">
                {vacancies.map((vacancy) => {
                    return(
                        <AdminVacancyCard key={vacancy._id} dataVacancy={vacancy}/>
                    )     
                })}
            </div>
        </div>
    )
}
export default AdminVacancyPage