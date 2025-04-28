import {useState} from 'react';
import { IVacancy } from '../../modelTypes/reponses';

import { useAppDispatch } from '../../hooks/redux';
import { addNewVacancy, onChangeVacancy, openVacancyModal } from '../../store/adminSlice';

import './AdminVacancyCard.scss';
import './AdminVacancyCard-media.scss';

interface dataVacancy {
    dataVacancy: IVacancy;
}

const AdminVacancyCard: React.FC<dataVacancy> = ({dataVacancy}) => {

    const {salary, title, _id} = dataVacancy;
    const dispatch = useAppDispatch();

    console.log(_id, dataVacancy)

    return(
        <div className="adminVacancyCard">
            <div className="adminVacancyCard__infoWrapper" >
                <div>
                    {title}
                </div>
                <div>
                    {salary}
                </div>
            </div>
            <div className='adminVacancyCard__commit'>
                <button onClick={() => {
                    dispatch(addNewVacancy(false))
                    dispatch(onChangeVacancy(dataVacancy))
                    dispatch(openVacancyModal())
                }} className='adminVacancyCard__changeBtn'>Изменить</button>
            </div>
        </div>
    )
}
export default AdminVacancyCard