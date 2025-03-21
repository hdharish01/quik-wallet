import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mnemonicToSeed, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js"
import { Wallet, HDNodeWallet } from "ethers"
import { getSolana } from "@/app/actions/getSolana";
import { getEthereum } from "@/app/actions/getEthereum";

export interface SolanaWallet {
    publicKey: string,
    secretKey: string,
    balance: string | null
}

export interface EthereumWallet {
    address: string,
    privateKey: string,
    balance: string | null
}

export interface walletsState {
    solWallets: SolanaWallet[],
    ethWallets: EthereumWallet[],
    currentIndex: number,
    error: string | null
}

const initialState:walletsState = {
    solWallets: [],
    ethWallets: [],
    currentIndex: 0,
    error: null,
};

export const fetchSolanaBalance = createAsyncThunk('wallets/fetchSolanaBalance',async (publicKey:string,{ rejectWithValue})=>{
    try{
        const balance = await getSolana(publicKey);
        return {publicKey,balance};
    }catch{
        return rejectWithValue("Failed to fetch Solana balance");
    }
})

export const fetchEthereumBalance = createAsyncThunk('wallets/fetchEthereumBalance',async (address:string,{ rejectWithValue })=>{
    try{
        const balance = await getEthereum(address);
        return {address,balance};
    }catch{
        return rejectWithValue("Failed to fetch Ethereum balance");
    }
})

const walletsSlice = createSlice({
    name:"wallets",
    initialState:initialState,
    reducers:{
        addWallet:(state,action:PayloadAction<string>) => {
            const mnemonic = action.payload;

            state.error = null; //clears the previous errors

            if(!validateMnemonic(mnemonic)){
                state.error = "Invalid mnemonic phrase";
                return;
            }

            try{
                const seed = mnemonicToSeedSync(mnemonic); // generates a buffer

                try{
                    //solana wallet
                    const solPath = `m/44'/501'/${state.currentIndex}'/0'`;
                    const solDerivedSeed = derivePath(solPath, Buffer.from(seed).toString("hex")).key;
                    const solSecret = nacl.sign.keyPair.fromSeed(solDerivedSeed).secretKey;
                    const solkeypair = Keypair.fromSecretKey(solSecret);
                    state.solWallets.push({
                        publicKey: solkeypair.publicKey.toBase58(),
                        secretKey: Buffer.from(solkeypair.secretKey).toString("hex"),
                        balance: null,
                    });
                }catch(solError){
                    state.error = "Error generating solana wallet: "  + (solError instanceof Error ? solError.message : String(solError));
                }

                try{    
                    //ethereum wallet
                    const ethDerivationPath = `m/44'/60'/${state.currentIndex}'/0'`;
                    const hdNode = HDNodeWallet.fromSeed(seed);
                    const child = hdNode.derivePath(ethDerivationPath);
                    const ethPrivateKey = child.privateKey;
                    const wallet = new Wallet(ethPrivateKey);
                    state.ethWallets.push({
                        address: wallet.address,
                        privateKey: ethPrivateKey,
                        balance: null,
                    });
                }catch(ethError){
                    state.error = "Error generating ethereum wallet: " + (ethError instanceof Error ? ethError.message : String(ethError));
                }

                if(state.error === null){
                    state.currentIndex += 1;
                }

            }catch(error){
                state.error = "failed to process mnemonic: " + (error instanceof Error ? error.message : String(error));
            }
        },

        clearError:(state)=>{
            state.error = null;
        },

        clearWallet: () => initialState,
    },
    extraReducers: (builder) =>{
        builder.addCase(fetchSolanaBalance.fulfilled,(state,action)=>{
            const {publicKey,balance} = action.payload;
            const wallet = state.solWallets.find(w => w.publicKey === publicKey);
            if(wallet){
                wallet.balance = balance;
            }
        })
        .addCase(fetchEthereumBalance.fulfilled,(state,action)=>{
            const {address,balance} = action.payload;
            const wallet = state.ethWallets.find(w => w.address === address);
            if(wallet){
                wallet.balance = balance;
            }
        })
    }
})

export const { addWallet, clearError, clearWallet } = walletsSlice.actions;
export default walletsSlice.reducer;