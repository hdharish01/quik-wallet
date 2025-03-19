"use client"

import { useSelector } from "react-redux";
import { GenerateWalletButton } from "./GenerateWalletButton";
import { useEffect, useState } from "react";
import ExistingWalletButton from "./ExistingWalletButton";
import { validateMnemonic } from "bip39";
import { RootState } from "@/redux/store";

export function SeedPhrase() {
    const [inputMnemonic, setInputMnemonic] = useState("")
    const [isValidMnemonic, setIsValidMnemonic] = useState(false)
    const [isMnemonicAvailable, setIsMnemonicAvailable] = useState(false)
    const mnemonic = useSelector((state:RootState)=>state.mnemonic)
    const wallets = useSelector((state:RootState)=> state.wallets)
    const hasWallets = wallets.solWallets.length > 0

    useEffect(() => {
        // Only consider valid if there's input AND it passes validation
        {
            if (inputMnemonic && validateMnemonic(inputMnemonic)) {
                setIsValidMnemonic(true)
            } else {
                setIsValidMnemonic(false)
            };
        };

        if(inputMnemonic){
            setIsMnemonicAvailable(true);
        }else{
            setIsMnemonicAvailable(false);
        }

    }, [inputMnemonic])

    const mnemonicWords = mnemonic.mnemonic ? mnemonic.mnemonic.split(" ") : [];

    return (
        <div className="w-full overflow-x-hidden">
            {!hasWallets &&    
                <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 px-4">
                    <div className="w-full max-w-2xl">
                        <input 
                            type="text" 
                            className="p-2 w-full border-2 border-slate-400 rounded-lg bg-transparent text-white" 
                            placeholder="Enter your secret seed phrase here (or generate new one)" 
                            onChange={(e) => {
                                setInputMnemonic(e.target.value)
                            }}
                            value={inputMnemonic}
                        />
                    </div>
                    <div>
                        {isMnemonicAvailable ? (
                            <ExistingWalletButton inputMnemonic={inputMnemonic} setInputMnemonic={setInputMnemonic}/>
                        ) : (
                            <GenerateWalletButton setInputMnemonic={setInputMnemonic}/>
                        )}
                    </div>
                </div>
            }

            {mnemonic.error ? (
                <div className="text-red-500 text-xl text-center mt-6 px-4">
                    {mnemonic.error}
                </div>
            ) : mnemonicWords.length > 0 ? (
                <div className="mt-10 px-4 max-w-4xl mx-auto">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3">
                        {mnemonicWords.slice(0, 6).map((word:string, index:number) => (
                            <div 
                                key={`word-${index}`} 
                                className="bg-slate-700 border border-slate-600 rounded-lg p-2 text-center relative"
                            >
                                <div className="absolute top-1 left-2 text-xs text-slate-400">{index + 1}</div>
                                <div className="text-white font-mono">{word}</div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {mnemonicWords.slice(6, 12).map((word:string, index:number) => (
                            <div 
                                key={`word-${index + 6}`} 
                                className="bg-slate-700 border border-slate-600 rounded-lg p-2 text-center relative"
                            >
                                <div className="absolute top-1 left-2 text-xs text-slate-400">{index + 7}</div>
                                <div className="text-white font-mono">{word}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    )
}