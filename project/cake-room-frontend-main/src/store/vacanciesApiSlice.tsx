import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { vacancyCardType, vacancyInfoType } from '../modelTypes/vacancyTypes';

const backendApi = process.env.REACT_APP_BACK_URL || 'http://localhost:3004';

const vacanciesApiSlice = createApi({
    reducerPath: 'vacanciesApi',
    baseQuery: fetchBaseQuery({baseUrl: `${backendApi}/`}),
    endpoints: (builder) => ({
        getAllVacancies: builder.query<vacancyCardType[], void>({
            query: () => '/api/vacancies'
        }),
        getSingleVacancy: builder.query<vacancyInfoType, string>({
            query: (id) => `/api/vacancies/${id}`
        })
    })
});
export { vacanciesApiSlice }
export const {useGetAllVacanciesQuery,useGetSingleVacancyQuery} = vacanciesApiSlice;