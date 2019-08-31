import BitShares from "btsdex";
import { connect } from "../utils";

const heandler = async id => {
  await connect(false);

  let result = await BitShares.db.get_objects([id]);
  console.log(JSON.stringify(result[0], null, 2));

  return BitShares.disconnect();
};

export default {
  description: "get object data",
  command: "--object",
  arguments: "id",
  heandler
};
