import is from "is_js";

import account from "./account";
import asset from "./asset";
import node from "./node";
import block from "./block";
import object from "./object";
import history from "./history";
import transfer from "./transfer";
import testnet from "./testnet";

const help = {
  description: "commands info",
  command: ["--help", "-h"],
  arguments: "command",
  heandler: args => {
    if (args.length == 1) {
      let maxLengthName = Math.max(
        ...Object.values(options).map(
          ({ command }) => command.toString().length
        )
      );

      console.log(
        "btscli - BitShares command line interface\n\n" +
          "Usage: btscli [options] --help [options] - get command help\n\n" +
          "Options:"
      );
      Object.values(options).forEach(({ command, description }) => {
        let cmd = command.toString();
        while (cmd.length < maxLengthName) cmd += " ";

        console.log(`\t${cmd}\t${description}`);
      });
    } else {
      console.log("Commands help:\n");
      args.forEach(cmdName => {
        const cmd = options[cmdName];
        const command = Array.isArray(cmd.command)
          ? cmd.command[0]
          : cmd.command;
        const args =
          (cmd.arguments &&
            (Array.isArray(cmd.arguments) ? cmd.arguments : [cmd.arguments])) ||
          [];

        const params = args.map(arg => `<${arg}>`);
        console.log(
          `btscli ${command} ${params.join(" ")} - ${cmd.description}`
        );
      });
    }
  }
};

export const options = {
  help,
  node,
  account,
  asset,
  block,
  object,
  history,
  transfer,
  testnet
};

export const ARGV = {};

const findOption = arg =>
  Object.entries(options).find(([_, option]) =>
    Array.isArray(option.command)
      ? option.command.includes(arg)
      : option.command === arg
  );

export const parseARGV = () => {
  let getArgsMode = false;

  process.argv.forEach(arg => {
    const item = findOption(arg);

    if (is.not.existy(item)) {
      if (getArgsMode) {
        let { cmdName, index } = getArgsMode;

        let option = options[cmdName];
        if (Array.isArray(ARGV[cmdName]) && ARGV[cmdName].length > 1) {
          ARGV[cmdName][index] =
            typeof option.arguments[index] === "function"
              ? option.arguments[index](arg)
              : arg;

          getArgsMode.index++;
          if (index >= ARGV[cmdName].length) getArgsMode = false;
        } else {
          getArgsMode.index++;
          ARGV[cmdName] =
            typeof option.arguments === "function"
              ? option.arguments(arg)
              : arg;

          getArgsMode = false;
        }
      }
      return;
    }

    const [cmdName, option] = item;

    if (is.not.existy(option.arguments)) {
      ARGV[cmdName] = true;
    } else {
      ARGV[cmdName] =
        Array.isArray(option.arguments) && option.arguments.length > 1
          ? new Array(option.arguments.length)
          : undefined;

      getArgsMode = { cmdName, index: 0 };
    }
  });
};
