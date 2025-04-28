import React from 'react';
import { useParams } from 'react-router-dom';
import { vacancyInfoType } from '../../../modelTypes/vacancyTypes';

import { useGetSingleVacancyQuery } from '../../../store/vacanciesApiSlice';
import Spinner from '../../spinner/Spinner';

import error503 from '../../../resources/img/vacancyPage/error503.jpg';
import phone from '../../../resources/icons/vacancyInfoPage/phone.svg';
import emailIcon from '../../../resources/icons/vacancyInfoPage/email.svg'

import './VacancyInfoPage.scss';
import './VacancyInfoPage-media.scss';

const VacancyInfoPage = () => {

    const { id } = useParams();
    //the validating identifier is null or undefined using operator ??
    const { data: vacancyInfo, error, isLoading } = useGetSingleVacancyQuery(id ?? '') as { data: vacancyInfoType | undefined, error: any, isLoading: boolean };

    if(!vacancyInfo || !id) return <div>Вакансия не найдена</div>

    const {title, requirements, duties, conditions, salary, description, _id} = vacancyInfo;

    return (
        <>
            <div className="vacancyInfo">
                <div className="container">
                    {isLoading ? <Spinner />: ''}
                    {error ? <img alt='error' src={error503} /> : ''}
                            <div key={_id}>
                                <div className="vacancyInfo__card">
                                    <h1 className="vacancyInfo__title">{title}</h1>
                                    <div className="vacancyInfo__salary">{salary}</div>
                                    <div className="vacancyInfo__descr">{description}</div>
                                    <a href="tel: +78000000000" className="vacancyInfo__call">Позвонить</a>
                                </div>

                                <div className="vacancyInfo__blocks">
                                {(duties.length !== 0) && <div className="vacancyInfo__block">
                                    <div className="vacancyInfo__block_title">Обязанности:</div>
                                    <ul className="vacancyInfo__block_list">
                                        {duties.map((item: string, index: number) => {
                                            return(
                                                <li key={`duty-${index}`}>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>}
                                {(requirements.length !== 0) && <div className="vacancyInfo__block">
                                    <div className="vacancyInfo__block_title">Требования:</div>
                                    <ul className="vacancyInfo__block_list">
                                        {requirements.map((item: string, index: number) => {
                                                return(
                                                    <li key={`requirement-${index}`}>{item}</li>
                                                )
                                            })}
                                    </ul>
                                </div>}
                                {(conditions.length !== 0) && <div className="vacancyInfo__block">
                                    <div className="vacancyInfo__block_title">Условия:</div>
                                    <ul className="vacancyInfo__block_list">
                                    {conditions.map((item: string, index: number) => {
                                            return(
                                                <li key={`condition-${index}`}>{item}</li>
                                            )
                                        })}
                                    </ul>
                                </div>}
                            </div>
                        </div>
                    <div className="vacancyInfo__contacts">
                        <div className="vacancyInfo__contacts_title">Контактная информация</div>
                        <div className="vacancyInfo__contacts-wrapper">
                            <div className="vacancyInfo__contacts_block">
                                <img src={phone} alt="phone number" />
                                <a href="tel:+78000000000" className='vacancyInfo__contacts_block-connectItem'>+7 (800) 000-00-00</a>
                            </div>
                            <div className="vacancyInfo__contacts_block">
                                <img src={emailIcon} alt="email" />
                                <a className='vacancyInfo__contacts_block-connectItem' href="mailto:thecakeroom@mail.ru">thecakeroom@mail.ru</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default VacancyInfoPage;