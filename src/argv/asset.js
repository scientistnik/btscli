import BitShares from "btsdex";
import { connect } from "../utils";

const heandler = async asset => {
  await connect(false);

  let result = await BitShares.assets[asset];
  console.log(JSON.stringify(result, null, 2));

  return BitShares.disconnect();
};

export default {
  description: "get asset data",
  command: "--asset",
  arguments: "asset",
  heandler
};
