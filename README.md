# btscli

Tools for work with BitShares in command line

[![Inline docs](https://david-dm.org/scientistnik/btscli.svg)](https://david-dm.org/scientistnik/btscli.svg)

## Setup

You can download [binary file](https://github.com/scientistnik/btscli/releases) or build on your system.

### Build

```
$ git clone git@github.com:scientistnik/btscli.git
$ cd btscli
$ yarn
$ yarn build
$ yarn pkg
```

## Use

Start console mode with autoconnect to mainnet BitShares:
```js
$ btscli
>|
```
If you want to connect on testnet, try this:
```js
$ btscli --testnet
>|
```
or use `--node` key:
```js
$ btscli --node wss://api.bts.blckchnd.com
>|
```

It is nodejs REPL with several variables:
- `BitShares`, main class `BitShares` package
- `login`, function to create object of class `BitShares`
- `generateKeys`, to generateKeys from login and password
- `accounts`, is analog `BitShares.accounts`
- `assets`, is analog `BitShares.assets`
- `db`, is analog `BitShares.db`
- `history`, is analog `BitShares.hostory`
- `network`, is analog `BitShares.network`
- `fees`, is analog `BitShares.fees`

#### For example

```js
$ btsdex
> assets["bts"].then(console.log)
```

### Shot request

If need call only one request, you may use `--account`, `--asset`, `--block`, `--object`, `--history` or `--transfer` keys in command-line:
```js
$ btscli --account <'name' or 'id' or 'last number in id'>
{
  "id": "1.2.5992",
  "membership_expiration_date": "1970-01-01T00:00:00",
  "registrar": "1.2.37",
  "referrer": "1.2.21",
  ...
}
$ btsdex --asset <'symbol' or 'id' or 'last number in id'>
{
  "id": "1.3.0",
  "symbol": "BTS",
  "precision": 5,
  ...
}
$ btsdex --block [<number>]
block_num: 4636380
{
  "previous": "0046bedba1317d146dd6afbccff94412d76bf094",
  "timestamp": "2018-10-01T13:09:40",
  "witness": "1.6.41",
  ...
}
$ btsdex --object 1.2.3
{
  "id": "1.2.3",
  "membership_expiration_date": "1969-12-31T23:59:59",
  "registrar": "1.2.3",
  "referrer": "1.2.3",
  ...
}
$ btsdex --history <account> [<limit>] [<start>] [<stop>]
[
  {
    "id": "1.11.98179",
    "op": [
      0,
  ...
}]
$ btsdex --transfer <from> <to> <amount> <asset> [--key]
Transfered <amount> <asset> from '<from>' to '<to>' with memo '<memo>'
```

## Contributing

Bug reports and pull requests are welcome on GitHub. For communication, you can use the Telegram-channel [btdex](https://t.me/btsdex).

## License

The package is available as open source under the terms of the [MIT License](https://github.com/scientistnik/btscli/blob/master/LICENSE).