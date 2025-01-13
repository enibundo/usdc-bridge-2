import { useChain, useChainWallet, useWalletClient } from "@cosmos-kit/react";
import { WalletConnection } from "./WalletConnection";

export function WalletInformation(props: { isWalletConnected: boolean }) {
  const { address } = useChain("nobletestnet");
  const context = useChainWallet("nobletestnet", "keplr-extension", false);

  console.log("context", context);
  context.getSigningStargateClient().then((client) => {
    console.log("client", client);
    if (address !== undefined) {
      client.getBalance(address, "uusdc").then((balance) => {
        console.log("USDC balance = " + balance.amount);
      });
    }
  });

  return (
    <>
      <span>
        <WalletConnection />

        {props.isWalletConnected && address !== undefined && (
          <>
            {" // "}
            {address}
          </>
        )}
      </span>
    </>
  );
}
