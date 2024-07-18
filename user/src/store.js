import { configureStore } from "@reduxjs/toolkit"
import productSlice from "./Slice/productSlice"
import addressSlice from "./Slice/addressSlice"
import categorySlice from "./Slice/categorySlice"
import commonSlice from "./Slice/commonSlice"

export const store = configureStore({
    reducer: {
        categorys: categorySlice,
        products: productSlice,
        address: addressSlice,// sliceName: sliceFile
        common:commonSlice,

    },
})