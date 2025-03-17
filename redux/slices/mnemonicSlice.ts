import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {mnemonic:""}

const mnemonicSlice = createSlice({
    name:"mnemonic",
    initialState:initialState,
    reducers:{
        changeMnemonic: (state,action) => {
            state.mnemonic = action.payload;
        }
    }
})


export const { changeMnemonic } = mnemonicSlice.actions
export default mnemonicSlice.reducer;