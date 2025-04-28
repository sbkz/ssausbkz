import React, { useEffect } from "react";

import VacancyCard from "../../vacancyCard/VacancyCard";
import { useGetAllVacanciesQuery } from "../../../store/vacanciesApiSlice";
import Spinner from "../../spinner/Spinner";

import error503 from '../../../resources/img/vacancyPage/error503.jpg';

import './VacancyPage.scss';
import './VacancyPage-media.scss';


const VacancyPage = () => {

    const {data: vacancies = [], error, isLoading, refetch} = useGetAllVacanciesQuery();

    useEffect(() => {
        refetch();
    }, [refetch]);

    console.log('Vacancies data:', vacancies);
    console.log('Error:', error);
    console.log('Loading:', isLoading);

    return(
        <>
            <div className="vacancy">
                <div className="container">
                    <h1 className="vacancy__title">Открытые вакансии</h1>
                    <div className="vacancy__list">
                        { error ? <img alt="error503" style={{width: '100%'}} src={error503} /> : ''}
                        { isLoading ? <Spinner />: ''}
                        {vacancies.map((item) => {
                                return (
                                    item.isActive ?
                                    <VacancyCard key={item._id} vacancyData={item} />
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
export default VacancyPage