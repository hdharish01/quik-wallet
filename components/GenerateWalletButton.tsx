
import { generateMnemonic } from "bip39"


export function GenerateWalletButton(){
    
    return <div>
        <button className="bg-gradient-to-br from-emerald-800 to-emerald-600 text-white rounded-lg p-2  hover:bg-gradient-to-tl hover:ring-2 hover:ring-black hover:shadow-lg" onClick={()=>{
            const mn = generateMnemonic();
            
        }}>Genrate Wallet</button>
    </div>
}