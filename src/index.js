import repl from "repl";
import BitShares from "btsdex";
import { ARGV, options, parseARGV } from "./argv";
import { connect } from "./utils";

parseARGV();

const executeCommands = async () => {
  if ("help" in ARGV) options.help.heandler(Object.keys(ARGV));
  else {
    for (const [commandName, args] of Object.entries(ARGV)) {
      options[commandName].heandler &&
        (await options[commandName].heandler(args));
    }
  }
};

const initializeContext = context => {
  connect().then(() => {
    context.accounts = BitShares.accounts;
    context.assets = BitShares.assets;
    context.db = BitShares.db;
    context.history = BitShares.history;
    context.network = BitShares.network;
    context.fees = BitShares.fees;
  });

  context.BitShares = BitShares;
  context.btsdex = BitShares;
  context.login = BitShares.login.bind(BitShares);
  context.generateKeys = BitShares.generateKeys;
};

if (Object.keys(ARGV).find(name => options[name].heandler)) {
  executeCommands()
    .catch(console.error)
    .finally(BitShares.disconnect);
} else {
  const r = repl.start({ prompt: "> " });
  initializeContext(r.context);

  r.on("reset", initializeContext);
}
