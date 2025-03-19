import { changeMnemonic } from "@/redux/slices/mnemonicSlice";
import { addWallet } from "@/redux/slices/walletsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ExistingWalletButton({inputMnemonic,setInputMnemonic}:{inputMnemonic:string,setInputMnemonic:(value:string)=>void}) {
    const dispatch = useDispatch()

    return <div>
        <button className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-emerald-600 text-white rounded-lg p-2  hover:brightness-110 hover:ring-2 hover:ring-black hover:shadow-md hover:shadow-white transition-all duration-200" 
            onClick={()=>{
                dispatch(changeMnemonic(inputMnemonic));
                dispatch(addWallet(inputMnemonic));
                setInputMnemonic("")
        }}>Get wallet</button>
    </div>
}