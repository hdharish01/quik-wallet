import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { validateMnemonic } from "bip39";

interface MnemonicState {
    mnemonic:string,
    error: null | string
}

const initialState:MnemonicState = {
    mnemonic:"",
    error:null,
}

const mnemonicSlice = createSlice({
    name:"mnemonic",
    initialState:initialState,
    reducers:{
        changeMnemonic: (state,action:PayloadAction<string>) => {

            state.error = null;
            if(!validateMnemonic(action.payload)){
                state.error = "Invalid seed phrase";
                return;
            }
            state.mnemonic = action.payload;
        },

        clearMnemonic: () => initialState,
    }
})


export const { changeMnemonic, clearMnemonic } = mnemonicSlice.actions;
export default mnemonicSlice.reducer;