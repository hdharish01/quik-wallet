"use client"

import { useSelector } from "react-redux";
import { GenerateWalletButton } from "./GenerateWalletButton";
import { useEffect, useState } from "react";
import ExistingWalletButton from "./ExistingWalletButton";

export function SeedPhrase(){
    const [inputMnemonic, setInputMnemonic] = useState("")
    const [mnemonicAvailable, setMnemonicAvailable] = useState(false)
    const mnemonic = useSelector((state:any)=>state.mnemonic)

    useEffect(()=>{
        if(inputMnemonic){
            setMnemonicAvailable(true)
        }else{
            setMnemonicAvailable(false)
        }
    },[inputMnemonic])

    return <div>
        <div className="mt-10 flex justify-center gap-6">
            <div>
                <input 
                    type="text" 
                    className="p-2 w-[40rem] border-2 border-slate-400 rounded-lg bg-transparent text-white" 
                    placeholder="Enter your secret seed phrase here(or generate new one)" 
                    onChange={(e)=>{
                        setInputMnemonic(e.target.value)
                    }}
                ></input>
            </div>
            <div>
                {mnemonicAvailable ? <ExistingWalletButton inputMnemonic={inputMnemonic} /> : <GenerateWalletButton />}
            </div>
        </div>
        <div className="text-white text-3xl w-screen text-center mt-10">
            {mnemonic.mnemonic}
        </div>
        
    </div>
}