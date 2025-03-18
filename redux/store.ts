import { configureStore } from "@reduxjs/toolkit"
import mnemonicSlice from "./slices/mnemonicSlice"
import walletsSlice from "./slices/walletsSlice"

export const store = configureStore({
    reducer:{
        mnemonic:mnemonicSlice,
        wallets:walletsSlice,
    }
})