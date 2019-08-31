import dotenv from "dotenv";
import is from "is_js";
import { ARGV } from "./argv";

dotenv.config();

const getValue = ({ argv, env, defaultValue }) =>
  is.existy(argv) && is.existy(ARGV[argv])
    ? ARGV[argv]
    : is.existy(env) && is.existy(process.env[env])
    ? process.env[env]
    : defaultValue;

export const NODE = () =>
  getValue({
    argv: "node",
    env: "BITSHARES_NODE"
  });

export const TESTNET = () =>
  getValue({
    argv: "testnet",
    env: "BITSHARES_TESTNET",
    defaultValue: false
  });
