import { addWallet } from "@/redux/slices/walletsSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export function AddWalletButton() {
    const mnemonic = useSelector((state:RootState)=>state.mnemonic.mnemonic);
    const dispatch = useDispatch()
    return (
        <div className="flex justify-center mt-4 mb-6">
            <button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition-colors duration-200 flex items-center"
                onClick={()=>{
                    dispatch(addWallet(mnemonic))
                }}
            >
                Add Wallet
            </button>
        </div>
    )
}