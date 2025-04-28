import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IProduct, IVacancy } from "../modelTypes/reponses";
import AdminService from "../services/AdminService";
import { newProductDataDto, newVacancyDataDto } from "../dtos/adminDtos";
import { vacancyInfoType } from "../modelTypes/vacancyTypes";

type initialStateTypes = {
    products: IProduct[],
    vacancies: IVacancy[],
    isVacancyModalOpen: boolean,
    isCatalogModalOpen: boolean,
    changingVacancy: vacancyInfoType,
    changingProduct: IProduct,
    isItNewVacancy: boolean
}

type productBody = {
    _id: string,
    newProductData: newProductDataDto 
}
type vacancyBody = {
    newVacancyData: newVacancyDataDto 
}
type addVacancyBody = {
    newVacancy: Omit<vacancyInfoType, '_id'>
}

const initialState: initialStateTypes = {
    products: [],
    vacancies: [],
    isVacancyModalOpen: false,
    isCatalogModalOpen: false,
    changingVacancy: {} as vacancyInfoType,
    changingProduct: {} as IProduct,
    isItNewVacancy: false
}

export const getProducts = createAsyncThunk(
    'admin/getProducts',
    async (_, {rejectWithValue}) => {
        try {
            const response = await AdminService.getProducts();
            return {products: response.data}
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async (productData: IProduct, {rejectWithValue, dispatch}) => {
        try {
            const response = await AdminService.updateProduct(productData);
            await dispatch(getProducts());
            return {product: response.data}
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)

export const getVacancies = createAsyncThunk(
    'admin/getVacancies',
    async (_, {rejectWithValue}) => {
        try {
            const response = await AdminService.getVacancies();
            return {vacancies: response.data}
        } catch (err: any) {
            return rejectWithValue(err)
        }
    }
)

export const updateVacancy = createAsyncThunk(
    'admin/updateVacancy',
    async ({newVacancyData}: vacancyBody, {dispatch}) => {
        const response = await AdminService.updateVacancy(newVacancyData);
        await dispatch(getVacancies());
        return {vacancy: response.data}
    }
)

export const addVacancy = createAsyncThunk(
    'admin/addVacancy',
    async ({ newVacancy }: addVacancyBody, {dispatch}) => {
        const response = await AdminService.addVacancy(newVacancy);
        await dispatch(getVacancies());
        return {vacancy: response.data}
    }
)

const AdminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        closeVacancyModal(state) {
            state.isVacancyModalOpen = false;
        },
        openVacancyModal(state) {
            state.isVacancyModalOpen = true;
        },
        closeCatalogModal(state) {
            state.isCatalogModalOpen = false;
        },
        openCatalogModal(state) {
            state.isCatalogModalOpen = true;
        },
        onChangeVacancy(state, action) {
            state.changingVacancy = action.payload;
        },
        onChangeProduct(state, action) {
            state.changingProduct = action.payload;
        },
        addNewVacancy(state,action) {
            state.isItNewVacancy = action.payload;
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getProducts.fulfilled, (state, action) => {
            if(action.payload){
                state.products = action.payload.products;
            }
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
            if(action.payload){
                const index = state.products.findIndex(product => product._id === action.payload.product._id);
                if(index !== -1) {
                    state.products[index] = action.payload.product;
                }
            }
        })
        .addCase(getVacancies.fulfilled, (state, action) => {
            if(action.payload){
                state.vacancies = action.payload.vacancies;
            }
        })
        .addCase(updateVacancy.fulfilled, (state, action) => {
            if(action.payload){
                const index = state.vacancies.findIndex(vacancy => vacancy._id === action.payload.vacancy._id);
                if(index !== -1) {
                    state.vacancies[index] = action.payload.vacancy;
                }
            }
        })
        .addCase(addVacancy.fulfilled, (state, action) => {
            if(action.payload){
                state.vacancies.push(action.payload.vacancy);
            }
        })
    },
})

export const { 
    closeVacancyModal, 
    openVacancyModal, 
    closeCatalogModal, 
    openCatalogModal,
    onChangeVacancy,
    onChangeProduct,
    addNewVacancy 
} = AdminSlice.actions;

export default AdminSlice.reducer;