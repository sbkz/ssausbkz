export type basketItemType = {
    title: string,
    price: number,
    photoPath: string,
    _id: string,
    priceForOne: number,
    quantity: number,
    totalPrice: number
}

export type basketStorageItemType = {
    product: basketItemType,
    quantity: number
}

export type orderProductType = {
    quantity: number,
    product: string
}

export type createOrderRequestType = {
    purchasedProducts: orderProductType[]
}