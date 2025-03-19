"use client"
import { clearMnemonic } from "@/redux/slices/mnemonicSlice";
import { clearWallet } from "@/redux/slices/walletsSlice";
import { useDispatch } from "react-redux"

export function Topbar(){
    const dispatch = useDispatch();
    return <div className="flex justify-between mx-20 pt-10">
        <div className="text-white text-6xl font-serif">
            Quik-Wallet
        </div>
        <div className="flex flex-col justify-center">
            <button 
                className="bg-slate-950 text-white rounded-lg p-2 hover:bg-red-900 hover:ring-2 hover:ring-red-950 transition-all duration-200"
                onClick={()=>{
                    dispatch(clearWallet());
                    dispatch(clearMnemonic());
                }}
            >Clear wallet</button>
        </div>
    </div>
}