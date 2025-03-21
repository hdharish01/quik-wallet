"use server"

import axios from "axios";
import Web3 from "web3";

export async function getEthereum(address: string) {
    const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

    if (!ALCHEMY_API_KEY) {
        console.error("Alchemy API key is missing.");
        return null;
    }
    
    const options = {
        method: 'POST',
        url: `https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
        headers: {
            accept: 'application/json', 
            'content-type': 'application/json'
        },
        data: {
            id: 1, 
            jsonrpc: '2.0', 
            method: 'eth_getBalance', 
            params: [address, 'latest']
        },
    };

    try {
        const response = await axios.request(options);
        const balanceWei = response.data.result;
        if (balanceWei === undefined) {
            console.error("RPC error:", response.data.error);
            return "Error";
        }
        // Convert from wei (hex string) to ETH
        const balanceEth = Web3.utils.fromWei(balanceWei, "ether");
        return balanceEth;
    } catch (error) {
        console.error("Error while fetching Ethereum balance:", error);
        return "Error";
    }
}