import { BridgeResult } from "@/model/BridgeResult";
import { Badge } from "./ui/badge";
import { ExternalLink } from "lucide-react";

export function BridgeLog({ logs }: { logs: BridgeResult[] }) {
  let logCounter = 0;
  const logLineComponent = (log: BridgeResult, key: number) =>
    log.type === "successful" ? (
      <Badge key={key} variant={"outline"} className="m-2 p-2 min-w-full">
        <a
          target="_blank"
          href={`https://www.mintscan.io/noble-testnet/tx/${log.txHash}`}
        >
          <ExternalLink size={"15"} /> <br />
          {log.txHash}
        </a>
      </Badge>
    ) : (
      <Badge key={key} variant={"secondary"}>
        {log.message}
      </Badge>
    );

  const logsElement = (
    <>
      {logs.map((log) => {
        return logLineComponent(log, logCounter++);
      })}
    </>
  );

  return <div>{logsElement}</div>;
}
