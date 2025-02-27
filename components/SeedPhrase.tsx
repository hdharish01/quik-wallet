"use client"

import { GenerateWalletButton } from "./GenerateWalletButton";

export function SeedPhrase(){
    
    return <div className="mt-10 flex justify-center gap-6">
        <div>
            <input type="text" className="p-2 w-[40rem] border-2 border-slate-400 rounded-lg bg-transparent" placeholder="Enter your secret seed phrase here(or generate new one)"></input>
        </div>
        <div>
            <GenerateWalletButton></GenerateWalletButton>
        </div>
    </div>
}