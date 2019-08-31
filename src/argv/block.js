import BitShares from "btsdex";
import { connect } from "../utils";

const heandler = async number => {
  await connect(false);

  let block_num =
    number ||
    (await BitShares.db.get_dynamic_global_properties()).head_block_number;
  let result = await BitShares.db.get_block(block_num);

  console.log(`block_num: ${block_num}`);
  console.log(JSON.stringify(result, null, 2));

  return BitShares.disconnect();
};

export default {
  description: "get block data",
  command: "--block",
  arguments: "number",
  heandler
};
