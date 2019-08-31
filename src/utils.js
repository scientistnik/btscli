import BitShares from "btsdex";
import { Writable } from "stream";
import { NODE, TESTNET } from "./env";

export const mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted) process.stdout.write(chunk, encoding);
    else process.stdout.write(Buffer.from("*", "utf-8"), encoding);
    callback();
  }
});

export const connect = (autoreconnect = true) => {
  let node =
    NODE() || (TESTNET() ? "wss://node.testnet.bitshares.eu" : BitShares.node);

  return BitShares.connect(node, autoreconnect).then(() =>
    console.log(`Connected to API node: ${node}`)
  );
};
