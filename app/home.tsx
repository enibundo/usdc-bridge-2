"use client";

import { BridgeForm } from "@/components/BridgeForm";
import { useChain } from "@cosmos-kit/react";
import { WalletConnection } from "@/components/WalletConnection";
import { WalletStatus } from "cosmos-kit";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { WalletInformation } from "@/components/WalletInformation";

export default function Home() {
  const { status, address } = useChain("nobletestnet");
  const [isWalletConnected, setIsWalletConnected] = useState(
    status === WalletStatus.Connected
  );

  useEffect(() => {
    setIsWalletConnected(status === WalletStatus.Connected);
  }, [status]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <WalletInformation isWalletConnected={isWalletConnected} />

        <Separator />

        <Card>
          <CardHeader />
          <CardContent>
            <BridgeForm isEnabled={isWalletConnected} />
          </CardContent>
        </Card>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Simple USDC Bridge + Keplr Wallet Connection / @enibundo
      </footer>
    </div>
  );
}
