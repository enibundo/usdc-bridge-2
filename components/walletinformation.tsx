import { WalletConnection } from "./WalletConnection";

export function WalletInformation(props: {
  isWalletConnected: boolean;
  address: string | undefined;
}) {
  return (
    <>
      <span>
        <WalletConnection />

        {props.isWalletConnected && props.address !== undefined && (
          <>
            {" // "}
            {props.address}
          </>
        )}
      </span>
    </>
  );
}
