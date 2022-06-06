import { ethers } from 'ethers';
import { deriveBIP44AddressKey } from '@metamask/key-tree';

let PRIVATE_KEY;

const provider = new ethers.providers.Web3Provider(wallet);

wallet.registerRpcMessageHandler(async (_, requestObject) => {

  if (!PRIVATE_KEY) await initialize();

  switch (requestObject.method) {
    case 'sign':
      console.log('received request', requestObject);

      const ethWallet = new ethers.Wallet(PRIVATE_KEY, provider);
      console.dir(ethWallet);

      const transaction = requestObject.params[0];
      return ethWallet.signTransaction(transaction);
    default:
      throw new Error(`Method: ${requestObject.method} not found.`);
  }
});

/**
 * Calls `snap_getBip44Entropy_60` and sets {@link PRIVATE_KEY} to an address key
 * derived from the received `coin_type` entropy.
 */
async function initialize() {

  const coinTypeNode = await wallet.request({
    method: 'snap_getBip44Entropy_60',
  });

  PRIVATE_KEY = deriveBIP44AddressKey(coinTypeNode, {
    account: 0,
    change: 0,
    address_index: 0,
  }).slice(0, 32);
}
