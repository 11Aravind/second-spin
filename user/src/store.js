import {configureStore } from "@reduxjs/toolkit"

import addressSlice from "./Slice/addressSlice"
export const store=configureStore({
    reducer:{
             address:addressSlice,// sliceName: sliceFile
    },
})