"use client";

import { ChainProvider } from "@cosmos-kit/react";
import Home from "./home";
import { chains, assets } from "chain-registry";
import { wallets } from "@cosmos-kit/keplr";
import { SignerOptions } from "cosmos-kit";

export default function Page() {
  const signerOptions: SignerOptions = {};

  return (
    <ChainProvider
      chains={chains}
      wallets={wallets}
      assetLists={assets}
      walletConnectOptions={{
        signClient: {
          projectId: "a8510432ebb71e6948cfd6cde54b70f7",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "Cosmos Kit dApp",
            description: "Cosmos Kit dApp built by Create Cosmos App",
            url: "https://docs.cosmology.zone/cosmos-kit/",
            icons: [],
          },
        },
      }}
      signerOptions={signerOptions}
    >
      <Home />
    </ChainProvider>
  );
}
