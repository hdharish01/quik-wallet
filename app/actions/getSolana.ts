"use server"

import axios from "axios"

export async function getSolana(publicKey:string) {
    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

    if(!ALCHEMY_API_KEY){
        console.error("Alchemy API key is missing.");
        return null;
    }
    
    const options = {
        method: 'POST',
        url: `https://solana-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        headers: {accept: 'application/json', 'content-type': 'application/json'},
        data: {id: 1, jsonrpc: '2.0', method: 'getBalance', params:[publicKey]},
    };

    try{
        const response = await axios.request(options);
        const lamportsBalance = response.data.result?.value;
        if(lamportsBalance === undefined){
            console.error("RPC error:",response.data.error);
            return null;
        }
        const solBalance = lamportsBalance / 1000000000; // 1 SOL = 10^9 lamports
        return solBalance.toString();
    }catch(error){
        console.error("error while getting solana Balance:",error);
        return null;
    }
}