
import { changeMnemonic } from "@/redux/slices/mnemonicSlice";
import { addWallet } from "@/redux/slices/walletsSlice";
import { generateMnemonic } from "bip39"
import { useDispatch } from "react-redux";


export function GenerateWalletButton(){
    const dispatch = useDispatch();
    return <div>
        <button className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white rounded-lg p-2  hover:bg-gradient-to-tl hover:ring-2 hover:ring-black hover:shadow-lg" onClick={()=>{
            const mn = generateMnemonic();
            dispatch(changeMnemonic(mn));
            dispatch(addWallet(mn));
        }}>Genrate Wallet</button>
    </div>
}