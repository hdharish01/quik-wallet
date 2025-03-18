"use client"


import { useSelector } from "react-redux";
import { SeedPhrase } from "./SeedPhrase";
import { SolanaWallet } from "@/redux/slices/walletsSlice";

export function Wallet(){
    const wallets = useSelector((state:any) => state.wallets)
    const error = useSelector((state:any) => state.wallets.error)
    return <div>
        <SeedPhrase></SeedPhrase>
        {wallets.solWallets.length > 0 && (
            <div className="mt-8 mx-auto max-w-5xl px-4">
                <h2 className="text-white text-4xl mb-4 text-center">Your Wallets</h2>
                <div className="grid grid-cols-1 gap-6">
                    {wallets.solWallets.map((solWallet:SolanaWallet, index:number) => {
                        const ethWallet = wallets.ethWallets[index];
                        
                        return (
                            <div key={`wallet-${index}`} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
                                <div className="p-4 bg-slate-700 border-b border-slate-600">
                                    <h3 className="text-white font-mono text-xl">Wallet {index + 1}</h3>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4 p-5">
                                    {/* Solana Section */}
                                    <div className="bg-slate-700/30 p-4 rounded-lg">
                                        <h4 className="text-emerald-400 font-bold font-mono text-lg mb-3">Solana</h4>
                                        <div className="mb-3">
                                            <p className="text-slate-400 text-sm mb-1">Public Key</p>
                                            <p className="text-white break-all bg-slate-700/50 p-2 rounded">{solWallet.publicKey}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-sm mb-1">Secret Key</p>
                                            <p className="text-white break-all bg-slate-700/50 p-2 rounded">{solWallet.secretKey}</p>
                                        </div>
                                    </div>
                                    
                                    {/* Ethereum Section */}
                                    {ethWallet && (
                                        <div className="bg-slate-700/30 p-4 rounded-lg">
                                            <h4 className="text-blue-400 font-bold font-mono text-lg mb-3">Ethereum</h4>
                                            <div className="mb-3">
                                                <p className="text-slate-400 text-sm mb-1">Address</p>
                                                <p className="text-white break-all bg-slate-700/50 p-2 rounded">{ethWallet.address}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-400 text-sm mb-1">Private Key</p>
                                                <p className="text-white break-all bg-slate-700/50 p-2 rounded">{ethWallet.privateKey}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
    </div>
}