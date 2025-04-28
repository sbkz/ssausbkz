import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import closeModal from '../../../resources/icons/adminModals/closeIcon.svg';
import { addVacancy, closeVacancyModal, updateVacancy, getVacancies } from '../../../store/adminSlice';  
import { useState } from 'react';

import './AdminVacancyModal.scss';
import './AdminVacancyModal-media.scss';


const AdminVacancyModal = () => {

    const { isVacancyModalOpen, changingVacancy, isItNewVacancy } = useAppSelector(store => store.adminState);
    const dispatch = useAppDispatch()

    const { title, salary, _id, description, isActive, conditions, duties, requirements} = changingVacancy;

    const [vacancyTitle, setVacancyTitle] = useState(title);
    const [requiredTitle, setRequiredTitle] = useState(true);
    const [vacancySalary, setVacancySalary] = useState(salary);
    const [requiredSalary, setRequiredSalary] = useState(true);
    const [vacancyDescription, setVacancyDescription] = useState(description);
    const [requiredDescription, setRequiredDescription] = useState(true);
    const [isVacancyActive, setVacancyActive] = useState(isActive);
    const [vacancyConditions, setVacancyConditions] = useState(conditions.join('\n').toString());
    const [vacancyDuties, setVacancyDuties] = useState(duties.join('\n'));
    const [vacancyRequirements, setVacancyRequirements] = useState(requirements.join('\n'));

    const onConditionsChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const conditions = e.target.value;
        const newConditions = conditions.split('\n');
        setVacancyConditions(newConditions.join('\n').toString())
    }

    const onDutiesChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const duties = e.target.value;
        const newDuties = duties.split('\n');
        setVacancyDuties(newDuties.join('\n').toString())
    }

    const onRequirementsChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        const requirements = e.target.value;
        const newRequirements = requirements.split('\n');
        console.log(newRequirements)
        setVacancyRequirements(newRequirements.join('\n').toString())
    }

    const onSubmitVacancy: React.MouseEventHandler<HTMLButtonElement> = async () => {
        const conditionsForDto = (vacancyConditions.trim() !== '')? vacancyConditions.split('\n') : [];
        const dutiesForDto = (vacancyDuties.trim() !== '')? vacancyDuties.split('\n') : [];
        const requirementsForDto = (vacancyRequirements.trim() !== '')? vacancyRequirements.split('\n') : [];
        const vacancyDataTemplate = {
            isActive: isVacancyActive,
            salary: vacancySalary,
            title: vacancyTitle,
            conditions: conditionsForDto,
            requirements: requirementsForDto,
            duties: dutiesForDto,
            description: vacancyDescription
        }
        const updateVacancyDto = {
            newVacancyData: {...vacancyDataTemplate, _id}
        }
        const addVacancyDto = {
            newVacancy: vacancyDataTemplate
        }
        if(vacancySalary.trim() !== '' && vacancyTitle.trim() !== '' && vacancyDescription.trim() !== ''){
            if(isItNewVacancy){
                await dispatch(addVacancy(addVacancyDto))
            }else {
                await dispatch(updateVacancy(updateVacancyDto))
            }
            // Обновляем список вакансий после успешного обновления
            dispatch(getVacancies())
            // Закрываем модальное окно
            dispatch(closeVacancyModal())
        }else {
            (vacancySalary.trim() === '') ? setRequiredSalary(false) : setRequiredSalary(true);
            (vacancyTitle.trim() === '') ? setRequiredTitle(false) : setRequiredTitle(true);
            (vacancyDescription.trim() === '') ? setRequiredDescription(false) : setRequiredDescription(true);
        }
    }
    
    return (
        <div 
        className="adminVacancyModal"
        style={{display: isVacancyModalOpen? 'flex' : 'none'}}

        >
            <div className="adminVacancyModal__settings">
                <img src={closeModal} alt="close modal" onClick={() => dispatch(closeVacancyModal())} className="adminVacancyModal__close" />
                <div className="adminVacancyModal__title">Настройки вакансий</div>
                <div className="adminVacancyModal__wrapper">
                    <label htmlFor="vacancy_input_title">Название <span style={{color: requiredTitle ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <input
                        type="text"
                        className='settings__input settings__input_title'
                        id='vacancy_input_title'
                        value={vacancyTitle}
                        onChange={(e) => {
                            setVacancyTitle(e.target.value)
                            setRequiredTitle(true)
                        }}
                        style={{border: requiredTitle ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <label htmlFor="vacancy_input_salary">Зарплата <span style={{color: requiredSalary ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <input 
                        type="text"
                        className='settings__input settings__input_salary'
                        id='vacancy_input_salary'
                        value={vacancySalary}
                        onChange={(e) => {
                            setVacancySalary(e.target.value)
                            setRequiredSalary(true)
                        }}
                        style={{border: requiredSalary ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <label htmlFor="vacancy_input_descr">Описание <span style={{color: requiredDescription ? "#FFF": "#E60000"}}>(обязательно)</span></label>
                    <textarea 
                        className='settings__input settings__input_descr'
                        id='vacancy_input_descr'
                        value={vacancyDescription}
                        onChange={(e) => {
                            setVacancyDescription(e.target.value)
                            setRequiredDescription(true)
                        }}
                        style={{border: requiredDescription ? "1px solid #EDEDF0": "1px solid #E60000"}}
                    />
                    <label htmlFor="vacancy_input_conditions">Условия</label>
                    <textarea
                        className='settings__input settings__input_conditions' 
                        id='vacancy_input_conditions'
                        value={vacancyConditions}
                        onChange={onConditionsChange}
                    />
                    <label htmlFor="vacancy_input_requirements">Требования</label>
                    <textarea
                        className='settings__input settings__input_requirements'
                        id='vacancy_input_requirements'
                        value={vacancyRequirements}
                        onChange={onRequirementsChange}
                    />
                    <label htmlFor="vacancy_input_duties">Обязанности</label>
                    <textarea
                        className='settings__input settings__input_duties'
                        id='vacancy_input_duties'
                        value={vacancyDuties}
                        onChange={onDutiesChange}
                    />
                    <div className="settings__wrapper_checkbox">
                        <div className="settings__input_isActive-title">Вкл/Выкл вакансию</div>
                        <input
                            type="checkbox"
                            className='settings__input settings__input_isActive'
                            id='vacancy_input_isActive'
                            checked={isVacancyActive}
                            onChange={(e) => setVacancyActive(!isVacancyActive)}
                        />
                        <label htmlFor="vacancy_input_isActive"></label>
                    </div>
                    <button className='settings__btn' onClick={onSubmitVacancy}>Изменить</button>
                </div>
            </div>
        </div>
    )
}
export default AdminVacancyModal