import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { basketItemType, basketStorageItemType, createOrderRequestType } from "../modelTypes/basketTypes";

const backendApi = process.env.REACT_APP_BACK_URL || 'http://localhost:3004/api';

type initialStatesType = {
    basketItems: basketItemType[],
    totalAmount: number,
    totalQuantity: number,
    basketModal: boolean,
    orderSuccessModal: boolean,
    orderErrorModal: boolean,
    errorMessage: string
}

const items =
  localStorage.getItem("basketItems") !== null
    ? JSON.parse(localStorage.getItem("basketItems") || '').map((item: basketStorageItemType) => item.product)
    : [];
const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount") || '')
    : 0;
const totalQuantity =
    localStorage.getItem("totalQuantity") !== null
      ? JSON.parse(localStorage.getItem("totalQuantity") || '')
      : 0;

const setItemFunc = (item: basketItemType[], totalAmount: number, totalQuantity: number) => {
        const storageItems: basketStorageItemType[] = item.map(basketItem => ({
            product: basketItem,
            quantity: basketItem.quantity
        }));
        
        localStorage.setItem("basketItems", JSON.stringify(storageItems));
        localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
        localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState: initialStatesType = {
    basketItems: items,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity,
    basketModal: false,
    orderSuccessModal: false,
    orderErrorModal: false,
    errorMessage: ''
}
// от кнопки до бека, запрос с токеном и без токена и какие компоненты используются

export const createOrder = createAsyncThunk(
    'basket/createOrder',
    async ({ basketItems }: { basketItems: basketItemType[] }, { rejectWithValue }) => {
        try {
            console.log('Creating order with data:', { basketItems });
            
            const orderData = {
                purchasedProducts: basketItems.map(item => ({
                    quantity: item.quantity,
                    product: item._id
                }))
            };

            const requestOptions = {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(orderData)
            };

            console.log('Sending request to:', `${backendApi}/orders`);
            console.log('Request options:', requestOptions);

            const response = await fetch(`${backendApi}/orders`, requestOptions);
            const responseData = await response.json();
            
            console.log('Server response:', responseData);
            
            if (!response.ok) {
                throw new Error(responseData.message || 'Failed to create order');
            }
            return responseData;
        } catch (error: any) {
            console.error('Error creating order:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            return rejectWithValue(errorMessage);
        }
    }
);

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem(state,action) {
            const newItem = action.payload;
            const id = newItem._id;
            const existingItem = state.basketItems.find((item) => item._id === id);
            if(!existingItem) {
                state.basketItems.push({
                    title: newItem.title,
                    price: newItem.price * newItem.box_weight,
                    photoPath: newItem.photoPath,
                    _id: newItem._id,
                    priceForOne: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price * newItem.box_weight,
                });
            }else{
                existingItem.quantity++;
                existingItem.totalPrice = Number(existingItem.quantity) * Number(existingItem.price);
            }

            state.totalQuantity = state.basketItems.reduce(
                (total, item) => total + Number(item.quantity),
                0
              );

            state.totalAmount = state.basketItems.reduce(
                (total, item) => total + Number(item.price) *  Number(item.quantity),
                0
            );

            setItemFunc(
                state.basketItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
              );
        },
        removeItem(state,action) {
            const _id = action.payload;
            const existingItem = state.basketItems.find((item) => item._id === _id);

           if(existingItem){
                existingItem.quantity--;
                existingItem.totalPrice = Number(existingItem.totalPrice) - Number(existingItem.price);
           }

            state.totalAmount = state.basketItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            state.totalQuantity = state.basketItems.reduce(
                (total, item) => total + Number(item.quantity),
                0
            );

            setItemFunc(
                state.basketItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },
        deleteItem(state, action) {
            const _id = action.payload;
            if(_id === 'all') {
                state.basketItems = [];
                state.totalAmount = 0;
                state.totalQuantity = 0;
                setItemFunc([], 0, 0);
                return;
            }
            
            const existingItem = state.basketItems.find((item) => item._id === _id);

            if(existingItem){
                state.basketItems = state.basketItems.filter((item) => item._id !== _id);
            }
            
            state.totalAmount = state.basketItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            state.totalQuantity = state.basketItems.reduce(
                (total, item) => total + Number(item.quantity),
                0
            );

            setItemFunc(
                state.basketItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },
        setInputState(state,action) {
            const quantityInput = action.payload.quantitySum;
            const _id = action.payload.id;
            const existingItem = state.basketItems.find((item) => item._id === _id);
            
            if(existingItem){
                existingItem.quantity = Number(quantityInput);
                existingItem.totalPrice = Number(quantityInput) * Number(existingItem.price);
            }

            state.totalAmount = state.basketItems.reduce(
                (total, item) => total + Number(item.price) * Number(item.quantity),
                0
            );

            state.totalQuantity = state.basketItems.reduce(
                (total, item) => total + Number(item.quantity),
                0
            );
            
            setItemFunc(
                state.basketItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },
        sendOrderByEmail(state,action){
            const buyersName = action.payload.buyersName;
            const buyersNumber = action.payload.buyersNumber;
            const buyersComment = action.payload.buyersComment;

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ buyersName,buyersComment,buyersNumber, order: state.basketItems, orderPrice: state.totalAmount})
            };
            fetch(`${backendApi}/mail/sendOrder`, requestOptions)
            .catch(err => console.log(err));

            state.basketItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            
            setItemFunc(
                state.basketItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
            );
        },
        openBasketModal(state) {
            state.basketModal = true
        },
        closeBasketModal(state){
            state.basketModal = false
        },
        openSuccessModal(state) {
            state.orderSuccessModal = true
        },
        closeSuccessModal(state){
            state.orderSuccessModal = false
        },
        closeErrorModal: (state) => {
            state.orderErrorModal = false;
            state.errorMessage = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                console.log('Order creation in progress...');
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                console.log('Order created successfully:', action.payload);
                setItemFunc([], 0, 0);
                state.basketItems = [];
                state.totalAmount = 0;
                state.totalQuantity = 0;
                state.orderSuccessModal = true;
            })
            .addCase(createOrder.rejected, (state, action) => {
                console.error('Order creation failed:', action.payload);
                state.orderErrorModal = true;
                state.errorMessage = action.payload as string;
            });
    }
});
export const {
    addItem,
    removeItem,
    deleteItem,
    setInputState,
    sendOrderByEmail,
    openBasketModal,
    closeBasketModal,
    openSuccessModal,
    closeSuccessModal,
    closeErrorModal
} = basketSlice.actions;
export default basketSlice.reducer;