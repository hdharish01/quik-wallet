import { Topbar } from "@/components/Topbar";
import { Wallet } from "@/components/Wallet";

export default function Home() {
  return <div className="bg-gradient-to-br from-gray-800 to-slate-900 min-h-screen">
      <Topbar></Topbar>
      <Wallet></Wallet>
  </div>
}
