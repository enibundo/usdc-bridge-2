"use client";

import { BridgeForm } from "@/components/BridgeForm";
import { useChain } from "@cosmos-kit/react";
import { WalletStatus } from "cosmos-kit";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { WalletInformation } from "@/components/WalletInformation";
import { useUsdcBridgeMutation } from "@/hooks/useUsdcBridgeMutation";
import { DeliverTxResponse } from "@cosmjs/stargate";
import { BridgeLog } from "@/components/BridgeLog";

export default function Home() {
  const { status, address } = useChain("nobletestnet");
  const [isWalletConnected, setIsWalletConnected] = useState(
    status === WalletStatus.Connected
  );
  const [bridgeLogs, setBridgeLogs] = useState<string[]>([]);

  const { mutate: mutateUsdcBridge } = useUsdcBridgeMutation({
    onBroadcastFinished: (txResult: DeliverTxResponse) => {
      console.log(
        "Bridge successful! : ",
        JSON.stringify(txResult.transactionHash)
      );
      setBridgeLogs(
        bridgeLogs.concat(`Bridge successful! : ${txResult.transactionHash}`)
      );
    },
    onBroadcastError: (message: string) => {
      setBridgeLogs(bridgeLogs.concat(`Bridge Error! : ${message}`));
    },
  });

  useEffect(() => {
    setIsWalletConnected(status === WalletStatus.Connected);
  }, [status]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WalletInformation isWalletConnected={isWalletConnected} />

        <Separator />

        <BridgeForm
          isEnabled={isWalletConnected}
          onBridge={async ({ amount, recipientAddress }) => {
            if (address) {
              mutateUsdcBridge({
                address,
                amount,
                recipient: recipientAddress,
              });
            }
          }}
        />

        <Separator />

        <BridgeLog logs={bridgeLogs} />
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Simple USDC Bridge + Keplr Wallet Connection / @enibundo
      </footer>
    </div>
  );
}
