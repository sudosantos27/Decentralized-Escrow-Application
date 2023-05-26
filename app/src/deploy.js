// Import ethers library from 'ethers' package
import { ethers } from 'ethers';

// Import the Escrow contract artifact
import Escrow from './artifacts/contracts/Escrow.sol/Escrow';

// Function to deploy the Escrow contract
export default async function deploy(signer, arbiter, beneficiary, value) {
  // Create a contract factory using the Escrow contract ABI, bytecode, and signer
  const factory = new ethers.ContractFactory(
    Escrow.abi,
    Escrow.bytecode,
    signer
  );

  // Deploy the contract with the provided parameters and send the specified value
  return factory.deploy(arbiter, beneficiary, { value });
}
