import { changeMnemonic } from "@/redux/slices/mnemonicSlice";
import { addWallet } from "@/redux/slices/walletsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ExistingWalletButton({inputMnemonic}:{inputMnemonic:string}) {
    const dispatch = useDispatch()

    return <div>
        <button className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white rounded-lg p-2  hover:bg-gradient-to-tl hover:ring-2 hover:ring-black hover:shadow-lg" 
            onClick={()=>{
                dispatch(changeMnemonic(inputMnemonic));
                dispatch(addWallet(inputMnemonic))
        }}>Get wallet</button>
    </div>
}