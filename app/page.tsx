"use client";

import { ChainProvider } from "@cosmos-kit/react";
import Home from "./home";
import { chains } from "chain-registry";
import { wallets } from "@cosmos-kit/keplr";
export default function Page() {
  return (
    <ChainProvider chains={chains} wallets={wallets}>
      <Home />
    </ChainProvider>
  );
}
