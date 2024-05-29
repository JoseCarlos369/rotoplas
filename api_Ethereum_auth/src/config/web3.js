import Web3 from 'web3';
import dotenv from 'dotenv';

dotenv.config();

const web3 = new Web3(process.env.ETHEREUM_PROVIDER_URL);


export const direccion_ethereum = async (req, res) => {
  const account = web3.eth.accounts.create();
  return { address: account.address, privateKey: account.privateKey };
};

export const firmar = async (firmar, mensaje) => {
  const messageHash = web3.utils.sha3(mensaje);
  const signature = web3.eth.accounts.sign(messageHash, firmar);
  return signature.signature;
};