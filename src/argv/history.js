import BitShares from "btsdex";
import { connect } from "../utils";

const heandler = async ([account_name, limit, start, stop]) => {
  await connect(false);

  let account = await BitShares.accounts[account_name];
  let history = await BitShares.history.get_account_history(
    account.id,
    /^1.11.\d+$/.test(start) ? start : "1.11.0",
    isNaN(limit) ? 100 : limit,
    /^1.11.\d+$/.test(stop) ? stop : "1.11.0"
  );
  console.log(JSON.stringify(history, null, 2));

  return BitShares.disconnect();
};

export default {
  description: "get account history",
  command: "--history",
  arguments: ["account_name", "limit", "start", "stop"],
  heandler
};
