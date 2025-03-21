"use client"

import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { SeedPhrase } from "./SeedPhrase";
import { SolanaWallet, EthereumWallet, fetchSolanaBalance, fetchEthereumBalance } from "@/redux/slices/walletsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { AddWalletButton } from "./AddWalletButton";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function Wallet() {
    const dispatch = useDispatch<AppDispatch>()
    const wallets = useSelector((state:RootState) => state.wallets)
    const [visibleKeys, setVisibleKeys] = useState<{[key: string]: boolean}>({})
    
    useEffect(()=>{
        if(wallets.solWallets.length>0){
            const lastIndex = wallets.solWallets.length - 1;
            dispatch(fetchSolanaBalance(wallets.solWallets[lastIndex].publicKey));
            dispatch(fetchEthereumBalance(wallets.ethWallets[lastIndex].address));
        }
    },[wallets.solWallets.length,dispatch])

    const toggleKeyVisibility = (walletIndex: number, keyType: string) => {
        const key = `${walletIndex}-${keyType}`;
        setVisibleKeys(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    }

    const isKeyVisible = (walletIndex: number, keyType: string) => {
        const key = `${walletIndex}-${keyType}`;
        return visibleKeys[key] || false;
    }

    const maskKey = (key: string) => {
        return "•".repeat(Math.min(key.length, 40));
    }

    return (
        <div className="w-full overflow-x-hidden">

            <SeedPhrase />

            {wallets.solWallets.length > 0 && (
                <div className="mt-8 mx-auto max-w-5xl px-4">
                    <h2 className="text-4xl mb-4 text-center font-mono bg-gradient-to-b from-emerald-400 to-blue-600 bg-clip-text text-transparent">Your Wallets</h2>

                    <AddWalletButton />

                    <div className="grid grid-cols-1 gap-6 overflow-hidden">
                        {wallets.solWallets.map((solWallet:SolanaWallet, index:number) => {
                            const ethWallet = wallets.ethWallets[index];
                            return (
                                <motion.div 
                                    key={`wallet-${index}`} 
                                    className="bg-slate-800 rounded-lg shadow-lg overflow-hidden"
                                    initial={{ opacity:0, y:20 }}
                                    animate={{ opacity:1, y:0}}
                                    transition={{ duration:0.5, ease:"easeOut" }}
                                >
                                    <div className="p-4 bg-slate-700 border-b border-slate-600">
                                        <h3 className="text-white font-mono text-xl">Wallet {index + 1}</h3>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-4 p-5">
                                        {/* Solana Section */}
                                        <div className="bg-slate-700/30 p-4 rounded-lg">
                                            <div className="flex justify-between items-center mb-3">
                                                <h4 className="text-emerald-400 font-bold font-mono text-lg">Solana</h4>
                                                <div className="text-right">
                                                    <span className="text-emerald-400 font-mono text-xl font-bold">SOL: </span>
                                                    <span className="text-white font-mono text-xl font-bold tracking-wide">
                                                        {solWallet.balance === null ? (
                                                            <span className="text-slate-400 text-lg italic">Loading...</span>
                                                        ) : solWallet.balance === "Error" ? (
                                                            <span className="text-red-400 text-lg">Failed to load</span>
                                                        ) : (
                                                            <span className="bg-gradient-to-r from-emerald-400 to-green-300 text-transparent bg-clip-text">{solWallet.balance}</span>
                                                        )}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <p className="text-slate-400 text-sm mb-1">Public Key</p>
                                                <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                    <p className="break-all overflow-hidden font-mono">{solWallet.publicKey}</p>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <p className="text-slate-400 text-sm">Secret Key</p>
                                                    <button 
                                                        onClick={() => toggleKeyVisibility(index, 'sol')}
                                                        className="text-slate-400 hover:text-white transition-colors duration-200 p-1"
                                                        aria-label={isKeyVisible(index, 'sol') ? "Hide Secret Key" : "Show Secret Key"}
                                                    >
                                                        {isKeyVisible(index, 'sol') ? (
                                                            <EyeOff size={16} />
                                                        ) : (
                                                            <Eye size={16} />
                                                        )}
                                                    </button>
                                                </div>
                                                <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                    <p className="break-all overflow-hidden font-mono">
                                                        {isKeyVisible(index, 'sol') ? solWallet.secretKey : maskKey(solWallet.secretKey)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Ethereum Section */}
                                        {ethWallet && (
                                            <div className="bg-slate-700/30 p-4 rounded-lg">
                                                <div className="flex justify-between items-center mb-3">
                                                    <h4 className="text-blue-400 font-bold font-mono text-lg">Ethereum</h4>
                                                    <div className="text-right">
                                                        <span className="text-blue-400 font-mono text-xl font-bold">ETH: </span>
                                                        <span className="text-white font-mono text-xl font-bold tracking-wide">
                                                            {ethWallet.balance === null ? (
                                                                <span className="text-slate-400 text-lg italic">Loading...</span>
                                                            ) : ethWallet.balance === "Error" ? (
                                                                <span className="text-red-400 text-lg">Failed to load</span>
                                                            ) : (
                                                                <span className="bg-gradient-to-r from-blue-400 to-indigo-300 text-transparent bg-clip-text">{ethWallet.balance}</span>
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <p className="text-slate-400 text-sm mb-1">Address</p>
                                                    <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                        <p className="break-all overflow-hidden font-mono">{ethWallet.address}</p>
                                                    </div>
                                                </div>
                                                <div className="mb-3">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <p className="text-slate-400 text-sm">Private Key</p>
                                                        <button 
                                                            onClick={() => toggleKeyVisibility(index, 'eth')}
                                                            className="text-slate-400 hover:text-white transition-colors duration-200 p-1"
                                                            aria-label={isKeyVisible(index, 'eth') ? "Hide Private Key" : "Show Private Key"}
                                                        >
                                                            {isKeyVisible(index, 'eth') ? (
                                                                <EyeOff size={16} />
                                                            ) : (
                                                                <Eye size={16} />
                                                            )}
                                                        </button>
                                                    </div>
                                                    <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                        <p className="break-all overflow-hidden font-mono">
                                                            {isKeyVisible(index, 'eth') ? ethWallet.privateKey : maskKey(ethWallet.privateKey)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}