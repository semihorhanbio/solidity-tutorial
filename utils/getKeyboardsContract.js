import { ethers } from "ethers";

import abi from "../utils/Keyboards.json";

const contractAddress = "0xd26091F9B73F6b8812463F526d6A96631f78d567";
const contractABI = abi.abi;

export default function getKeyboardsContract(ethereum) {
  if (ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  } else {
    return undefined;
  }
}
