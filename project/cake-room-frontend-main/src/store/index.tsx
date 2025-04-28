import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { productsApiSlice } from './productsApiSlice';
import { vacanciesApiSlice } from './vacanciesApiSlice';
import CatalogSlice from './catalogSlice';
import basketSlice from './basketSlice';
import mapModalReduser from './mapModalSlice';
import menuReduser from './menuSlice';
import loginSlice from './loginSlice';
import adminSlice from './adminSlice';

const rootReducer = combineReducers({
    mapModalState: mapModalReduser,
    menuState: menuReduser,
    productsApi: productsApiSlice.reducer,
    vacanciesApi: vacanciesApiSlice.reducer,
    catalogStates: CatalogSlice,
    basketStates: basketSlice,
    loginStates: loginSlice,
    adminState: adminSlice
})

const store = () =>{
 return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApiSlice.middleware, vacanciesApiSlice.middleware)
  })
}

export { store }

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store>
export type AppDisptach = AppStore['dispatch']
