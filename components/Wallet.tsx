"use client"

import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { SeedPhrase } from "./SeedPhrase";
import { SolanaWallet } from "@/redux/slices/walletsSlice";
import { RootState } from "@/redux/store";
import { AddWalletButton } from "./AddWalletButton";

export function Wallet() {
    const wallets = useSelector((state:RootState) => state.wallets)
    const error = useSelector((state:RootState) => state.wallets.error)
    
    return (
        <div className="w-full overflow-x-hidden">

            <SeedPhrase />

            {wallets.solWallets.length > 0 && (
                <div className="mt-8 mx-auto max-w-5xl px-4">
                    <h2 className="text-white text-4xl mb-4 text-center">Your Wallets</h2>

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
                                            <h4 className="text-emerald-400 font-bold font-mono text-lg mb-3">Solana</h4>
                                            <div className="mb-3">
                                                <p className="text-slate-400 text-sm mb-1">Public Key</p>
                                                <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                    <p className="break-all overflow-hidden font-mono">{solWallet.publicKey}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-sm mb-1">Secret Key</p>
                                                <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                    <p className="break-all overflow-hidden font-mono">{solWallet.secretKey}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {/* Ethereum Section */}
                                        {ethWallet && (
                                            <div className="bg-slate-700/30 p-4 rounded-lg">
                                                <h4 className="text-blue-400 font-bold font-mono text-lg mb-3">Ethereum</h4>
                                                <div className="mb-3">
                                                    <p className="text-slate-400 text-sm mb-1">Address</p>
                                                    <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                        <p className="break-all overflow-hidden font-mono">{ethWallet.address}</p>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-slate-400 text-sm mb-1">Private Key</p>
                                                    <div className="text-white bg-slate-700/50 p-2 rounded max-w-full overflow-hidden">
                                                        <p className="break-all overflow-hidden font-mono">{ethWallet.privateKey}</p>
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