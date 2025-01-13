import { useChain, useChainWallet, useWalletClient } from "@cosmos-kit/react";
import { WalletConnection } from "./WalletConnection";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Wallet } from "lucide-react";

export function WalletInformation(props: { isWalletConnected: boolean }) {
  const { address, wallet } = useChain("nobletestnet");
  const context = useChainWallet("nobletestnet", "keplr-extension", false);
  const [balance, setBalance] = useState<string>();

  const fetchBalance = async () => {
    if (address !== undefined) {
      const client = await context.getSigningStargateClient();
      const currentBalance = await client.getBalance(address, "uusdc");
      setBalance(currentBalance.amount);
    }
  };

  if (props.isWalletConnected) {
    fetchBalance();
  }

  return (
    <>
      {props.isWalletConnected && address !== undefined && (
        <Alert>
          <Wallet className="h-6 w-6" />
          <AlertTitle>{context.username}</AlertTitle>
          <AlertDescription>
            {address}
            <br />
            {balance} UUSDC <br />
          </AlertDescription>
        </Alert>
      )}
      <WalletConnection />
    </>
  );
}
