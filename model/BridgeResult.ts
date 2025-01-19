export type BridgeResult =
  | {
      type: "successful";
      txHash: string;
    }
  | {
      type: "error";
      message: string;
    };
