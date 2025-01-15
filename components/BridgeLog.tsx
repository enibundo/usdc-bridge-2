export function BridgeLog({ logs }: { logs: string[] }) {
  const lameLogs = ["log 1", "log 2", "log 3", "log 4", "log 5"];

  const logsElement = (
    <>
      {logs.map((log) => {
        console.log("Log ", log);
        return <p>{log}</p>;
      })}
    </>
  );

  return <div>{logsElement}</div>;
}
