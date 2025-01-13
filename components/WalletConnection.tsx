import { useChain, useWalletClient } from "@cosmos-kit/react";
import { Button } from "@/components/ui/button";
import { WalletStatus } from "cosmos-kit";

export function WalletConnection() {
  const { address, status, connect, disconnect } = useChain("nobletestnet");
  const isWalletConnected = status === WalletStatus.Connected;

  return (
    <>
      {isWalletConnected ? (
        <Button
          size={"sm"}
          variant="destructive"
          onClick={() => {
            disconnect();
          }}
        >
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          size={"sm"}
          onClick={() => {
            connect();
          }}
        >
          Connect Wallet
        </Button>
      )}
    </>
  );
}
