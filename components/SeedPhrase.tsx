"use client"

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { GenerateWalletButton } from "./GenerateWalletButton";
import { useEffect, useState } from "react";
import ExistingWalletButton from "./ExistingWalletButton";
import { RootState } from "@/redux/store";
import { CopyMnemonicButton } from "./CopyMnemonicButton";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { changeMnemonic } from "@/redux/slices/mnemonicSlice";
import { addWallet } from "@/redux/slices/walletsSlice";

const wordAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: index * 0.1, duration: 0.3, ease: "easeOut" },
    }),
};

export function SeedPhrase() {
    const dispatch = useDispatch()

    const [inputMnemonic, setInputMnemonic] = useState("")
    
    const [isMnemonicAvailable, setIsMnemonicAvailable] = useState(false)
    const [isBlurred, setIsBlurred] = useState(false)
    const mnemonic = useSelector((state:RootState)=>state.mnemonic)
    const wallets = useSelector((state:RootState)=> state.wallets)
    const hasWallets = wallets.solWallets.length > 0

    useEffect(() => {
        // Only consider valid if there's input AND it passes validation
        if(inputMnemonic){
            setIsMnemonicAvailable(true);
        }else{
            setIsMnemonicAvailable(false);
        }

    }, [inputMnemonic])

    const mnemonicWords = mnemonic.mnemonic ? mnemonic.mnemonic.split(" ") : [];

    const toggleBlur = () => {
        setIsBlurred(!isBlurred);
    };

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
                            onKeyDown={(e)=>{
                                if(e.key === "Enter"){
                                    dispatch(changeMnemonic(inputMnemonic));
                                    dispatch(addWallet(inputMnemonic));
                                    setInputMnemonic("")
                                }
                            }}
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
                <div className="mt-10 px-4 max-w-4xl mx-auto overflow-hidden">
                    <div className="flex justify-end mb-2">
                        <button 
                            onClick={toggleBlur}
                            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1 rounded-lg transition-all duration-200"
                        >
                            {isBlurred ? (
                                <>
                                    <EyeIcon size={16} />
                                </>
                            ) : (
                                <>
                                    <EyeOffIcon size={16} />
                                </>
                            )}
                        </button>
                    </div>
                    
                    <div className="relative">
                        {isBlurred && (
                            <div className="absolute inset-0 bg-slate-800 bg-opacity-70 backdrop-blur-md z-10 flex items-center justify-center rounded-lg border border-slate-600">
                                <p className="text-slate-300">Seed phrase hidden for security</p>
                            </div>
                        )}
                        
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-3 overflow-hidden">
                            {mnemonicWords.slice(0, 6).map((word:string, index:number) => (
                                <motion.div 
                                    key={`word-${index}`} 
                                    className="bg-slate-700 border border-slate-600 rounded-lg p-2 text-center relative hover:brightness-125"
                                    variants={wordAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    custom={index}
                                >
                                    <div className="absolute top-1 left-2 text-xs text-slate-400">{index + 1}</div>
                                    <div className="text-white font-mono">{word}</div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 overflow-hidden">
                            {mnemonicWords.slice(6, 12).map((word:string, index:number) => (
                                <motion.div 
                                    key={`word-${index + 6}`} 
                                    className="bg-slate-700 border border-slate-600 rounded-lg p-2 text-center relative hover:brightness-125"
                                    variants={wordAnimation}
                                    initial="hidden"
                                    animate="visible"
                                    custom={index + 6}
                                >
                                    <div className="absolute top-1 left-2 text-xs text-slate-400">{index + 7}</div>
                                    <div className="text-white font-mono">{word}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    <CopyMnemonicButton />
                </div>
            ) : null}
        </div>
    )
}