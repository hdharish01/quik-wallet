import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { mnemonicToSeed, mnemonicToSeedSync, validateMnemonic } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js"
import { Wallet, HDNodeWallet } from "ethers"

export interface SolanaWallet {
    publicKey: string,
    secretKey: string,
}

export interface EthereumWallet {
    address: string,
    privateKey: string,
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
    }
})

export const { addWallet, clearError, clearWallet } = walletsSlice.actions;
export default walletsSlice.reducer;