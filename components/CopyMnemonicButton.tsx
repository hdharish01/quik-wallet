import { RootState } from "@/redux/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export function CopyMnemonicButton(){
    const [copied,setCopied] = useState(false);
    const mnemonic = useSelector((state:RootState)=>state.mnemonic.mnemonic);

    const handleCopy = async () => {
        if(mnemonic){
            try {
                await navigator.clipboard.writeText(mnemonic);
                setCopied(true);

                setTimeout(()=>{
                    setCopied(false);
                },2000);
            }catch(err){
                console.error("Failed to copy mnemonic:",err);
            }
        }
    };

    if(!mnemonic) return null;

    return (    
        <motion.button
            className={`mt-4 px-2 py-1 text-xs rounded-md flex items-center justify-center gap-1 ml-auto ${
                copied ? "bg-green-600" : "bg-slate-700 hover:bg-slate-600"
            } transition-colors duration-300`}
            onClick={handleCopy}
            initial={{opacity:0, y:10}}
            animate={{opacity:1, y:0}}
            transition={{delay:1.2,duration:0.3}}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                {copied ? (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                />
                ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
                )}
            </svg>
            <span className="text-white font-medium">
                {copied ? "Copied!" : "Copy"}
            </span>
        </motion.button>
    )
}