import BitShares from "btsdex";
import readline from "readline";
import { connect, mutableStdout } from "../utils";

const heandler = async ([from, to, amount, asset, isKey]) => {
  await connect(false);

  let rl = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
  });

  mutableStdout.muted = false;
  rl.question(
    `Enter the ${isKey ? "private key" : "password"}: `,
    async answer => {
      mutableStdout.muted = false;

      try {
        let account = isKey
          ? new BitShares(from, answer)
          : await BitShares.login(from, answer);

        rl.question("Write memo: ", async memo => {
          try {
            await account.transfer(to, asset, amount, memo);
            console.log(
              `Transfered ${amount} ${asset} from '${from}' to '${to}' with memo '${memo}'`
            );
          } catch (error) {
            console.log(`Error: ${error.message}`);
          }

          rl.close();
          BitShares.disconnect();
        });
      } catch (error) {
        console.log(`Error: ${error.message}`);
        rl.close();
        BitShares.disconnect();
      }
    }
  );
  mutableStdout.muted = true;
};

export default {
  description: "transfer operation",
  command: "--transfer",
  arguments: ["from", "to", "amount", "asset", "is_key"],
  heandler
};
