/* eslint-disable no-console */
/* eslint-disable max-len */

import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
  NetworkToNetworkName,
} from "@aptos-labs/ts-sdk";
import { compilePackage, getPackageBytesToPublish } from "./utils";

/**
 * This example demonstrate how one can publish a new custom coin to chain.
 * It uses the `MoonCoin.move()` module that can be found in this folder
 *
 * Before running this example, we should compile the package locally:
 * 1. Acquire the Aptos CLI, see https://aptos.dev/tools/aptos-cli/
 * 2. cd `~/aptos-ts-sdk/examples/typescript`
 * 3. Run `pnpm run your_coin`
 */

const COINS_TO_MINT = 1000000;

// Set up the client
const APTOS_NETWORK: Network =
  NetworkToNetworkName[process.env.APTOS_NETWORK ?? Network.DEVNET];
const config = new AptosConfig({ network: APTOS_NETWORK });
const aptos = new Aptos(config);

/** Register the receiver account to receive transfers for the new coin. */
async function registerCoin(
  receiver: Account,
  coinTypeAddress: AccountAddress,
  tokenPackageName: string,
  tokenName: string
): Promise<string> {
  const transaction = await aptos.transaction.build.simple({
    sender: receiver.accountAddress,
    data: {
      function: "0x1::managed_coin::register",
      typeArguments: [`${coinTypeAddress}::${tokenPackageName}::${tokenName}`],
      functionArguments: [],
    },
  });

  const senderAuthenticator = aptos.transaction.sign({
    signer: receiver,
    transaction,
  });
  const pendingTxn = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  return pendingTxn.hash;
}

/** Transfer the newly created coin to a specified receiver address */
async function transferCoin(
  sender: Account,
  receiverAddress: AccountAddress,
  amount: number | bigint,
  tokenPackageName: string,
  tokenName: string
): Promise<string> {
  const transaction = await aptos.transaction.build.simple({
    sender: sender.accountAddress,
    data: {
      function: "0x1::aptos_account::transfer_coins",
      typeArguments: [
        `${sender.accountAddress}::${tokenPackageName}::${tokenName}`,
      ],
      functionArguments: [receiverAddress, amount],
    },
  });

  const senderAuthenticator = aptos.transaction.sign({
    signer: sender,
    transaction,
  });
  const pendingTxn = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  return pendingTxn.hash;
}

/** Mints amount of the newly created coin to a specified receiver address */
async function mintCoin(
  minter: Account,
  receiverAddress: AccountAddress,
  amount: number,
  tokenPackageName: string,
  tokenName: string
): Promise<string> {
  const transaction = await aptos.transaction.build.simple({
    sender: minter.accountAddress,
    data: {
      function: "0x1::managed_coin::mint",
      typeArguments: [
        `${minter.accountAddress}::${tokenPackageName}::${tokenName}`,
      ],
      functionArguments: [receiverAddress, amount],
    },
  });

  const senderAuthenticator = aptos.transaction.sign({
    signer: minter,
    transaction,
  });
  const pendingTxn = await aptos.transaction.submit.simple({
    transaction,
    senderAuthenticator,
  });

  return pendingTxn.hash;
}

/** Returns the balance of the newly created coin for an account */
const getBalance = async (
  accountAddress: AccountAddress,
  coinTypeAddress: AccountAddress,
  tokenPackageName: string,
  tokenName: string
) =>
  aptos.getAccountCoinAmount({
    accountAddress,
    coinType: `${coinTypeAddress.toString()}::${tokenPackageName}::${tokenName}`,
  });

export async function generateToken(tokenName: string) {
  console.log("Creating token.... Starting.");
  const alice = Account.generate();

  console.log(`Initiated by: ${alice.accountAddress.toString()}`);
  console.log("Funding the account...");
  // Fund alice account
  await aptos.fundAccount({
    accountAddress: alice.accountAddress,
    amount: 100_000_000,
  });

  // Please ensure you have the aptos CLI installed
  console.log("[1/3]:Compiling token");
  compilePackage("./move/token", "./move/token/token.json", [
    { name: tokenName, address: alice.accountAddress },
  ]);

  const { metadataBytes, byteCode } = getPackageBytesToPublish(
    "move/token/token.json"
  );

  console.log(
    `[2/3]: Publishing the token package to ${aptos.config.network} network`
  );

  // Publish MoonCoin package to chain
  const transaction = await aptos.publishPackageTransaction({
    account: alice.accountAddress,
    metadataBytes,
    moduleBytecode: byteCode,
  });

  console.log(`[3/3]: Siging the token creation...`);
  const pendingTransaction = await aptos.signAndSubmitTransaction({
    signer: alice,
    transaction,
  });

  console.log(`Publish package transaction hash: ${pendingTransaction.hash}`);
  console.log("Waiting for the transaction to complete...");
  await aptos.waitForTransaction({ transactionHash: pendingTransaction.hash });

  console.log(`Minted ${COINS_TO_MINT} coins. Registering the coin...`);
  const registerCoinTransactionHash = await registerCoin(
    alice,
    alice.accountAddress,
    "moon_coin",
    tokenName
  );

  console.log("Waiting for registration transaction...");
  await aptos.waitForTransaction({
    transactionHash: registerCoinTransactionHash,
  });

  console.log("Minting...");
  const mintCoinTransactionHash = await mintCoin(
    alice,
    alice.accountAddress,
    COINS_TO_MINT,
    "moon_coin",
    tokenName
  );
  console.log("Waiting for mint transaction to complete");
  await aptos.waitForTransaction({ transactionHash: mintCoinTransactionHash });

  console.log("Minted successfully");
}
