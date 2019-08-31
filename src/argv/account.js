import BitShares from "btsdex";
import { connect } from "../utils";

const heandler = async account => {
  await connect(false);

  let result = await BitShares.accounts[account];
  console.log(JSON.stringify(result, null, 2));

  return BitShares.disconnect();
};

export default {
  description: "get account data",
  command: "--account",
  arguments: "account",
  heandler
};
