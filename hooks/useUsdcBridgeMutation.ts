import {
  CIRCLE_CCTP_DEPOSIT_FOR_BURN,
  NOBLE_TESTNET_RPC,
  USDC_DENOM,
  USDC_MULTIPLIER,
} from "@/lib/constants";
import { useChainWallet } from "@cosmos-kit/react";
import { useMutation } from "@tanstack/react-query";
import { SigningStargateClient } from "@cosmjs/stargate";
import { Registry, GeneratedType } from "@cosmjs/proto-signing";
import { MsgDepositForBurn } from "@/generated/tx";

function createDefaultRegistry(): Registry {
  const cctpTypes: ReadonlyArray<[string, GeneratedType]> = [
    [CIRCLE_CCTP_DEPOSIT_FOR_BURN, MsgDepositForBurn],
  ];
  return new Registry(cctpTypes);
}

export const useUsdcBridgeMutation = () => {
  const chainWalletContext = useChainWallet("nobletestnet", "keplr-extension");
  return useMutation({
    mutationKey: ["usdcBridge"],
    mutationFn: async ({
      address,
      amount,
      recipient,
    }: {
      address: string;
      amount: number;
      recipient: string;
    }) => {
      const offlineSigner = chainWalletContext.getOfflineSignerDirect();
      const clientSigner = await SigningStargateClient.connectWithSigner(
        NOBLE_TESTNET_RPC,
        offlineSigner!,
        {
          registry: createDefaultRegistry() as any,
        }
      );

      const rawMintRecipient = recipient;
      const cleanedMintRecipient = rawMintRecipient.replace(/^0x/, "");
      const zeroesNeeded = 64 - cleanedMintRecipient.length;
      const mintRecipient = "0".repeat(zeroesNeeded) + cleanedMintRecipient;
      const buffer = Buffer.from(mintRecipient, "hex");
      const mintRecipientBytes = new Uint8Array(buffer);
      const uusdcAmount = Number(amount) * USDC_MULTIPLIER;

      const msg = {
        typeUrl: CIRCLE_CCTP_DEPOSIT_FOR_BURN,
        value: {
          from: address,
          amount: uusdcAmount.toString(),
          destinationDomain: 0,
          mintRecipient: mintRecipientBytes,
          burnToken: USDC_DENOM,
        },
      };

      const fee = {
        amount: [
          {
            denom: USDC_DENOM,
            amount: "0",
          },
        ],
        gas: "200000",
      };

      const memo = "";

      try {
        const result = await clientSigner?.signAndBroadcast(
          address,
          [msg],
          fee,
          memo
        );
      } catch (e) {
        console.log(e);
      }
    },
  });
};
