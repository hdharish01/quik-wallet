import { configureStore } from "@reduxjs/toolkit"
import mnemonicSlice from "./slices/mnemonicSlice"
export const store = configureStore({
    reducer:{
        mnemonic:mnemonicSlice
    }
})