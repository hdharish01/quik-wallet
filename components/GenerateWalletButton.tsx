
import { changeMnemonic } from "@/redux/slices/mnemonicSlice";
import { addWallet } from "@/redux/slices/walletsSlice";
import { generateMnemonic } from "bip39"
import { useDispatch } from "react-redux";


export function GenerateWalletButton({setInputMnemonic}:{setInputMnemonic:(value:string)=>void}){
    const dispatch = useDispatch();
    return <div>
        <button className="relative overflow-hidden bg-gradient-to-br from-emerald-800 to-emerald-600 text-white rounded-lg p-2  hover:brightness-110 hover:ring-2 hover:ring-black hover:shadow-md hover:shadow-white transition-all duration-200" onClick={()=>{
            const mn = generateMnemonic();
            dispatch(changeMnemonic(mn));
            dispatch(addWallet(mn));
            setInputMnemonic("");
        }}>Genrate Wallet</button>
    </div>
}