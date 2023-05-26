const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Escrow', function () {
  let contract;
  let depositor;
  let beneficiary;
  let arbiter;
  const deposit = ethers.utils.parseEther('1');

  beforeEach(async () => {
    // Get signers (accounts) from the provider
    depositor = ethers.provider.getSigner(0);
    beneficiary = ethers.provider.getSigner(1);
    arbiter = ethers.provider.getSigner(2);

    // Deploy the Escrow contract
    const Escrow = await ethers.getContractFactory('Escrow');
    contract = await Escrow.deploy(
      arbiter.getAddress(),
      beneficiary.getAddress(),
      {
        value: deposit,
      }
    );
    await contract.deployed();
  });

  it('should be funded initially', async function () {
    // Check if the contract has the initial deposit
    let balance = await ethers.provider.getBalance(contract.address);
    expect(balance).to.eq(deposit);
  });

  describe('after approval from address other than the arbiter', () => {
    it('should revert', async () => {
      // Attempt to approve from a non-arbiter address and expect it to revert
      await expect(contract.connect(beneficiary).approve()).to.be.reverted;
    });
  });

  describe('after approval from the arbiter', () => {
    it('should transfer balance to beneficiary', async () => {
      // Get the beneficiary's balance before approval
      const before = await ethers.provider.getBalance(beneficiary.getAddress());

      // Call the approve function from the arbiter's address
      const approveTxn = await contract.connect(arbiter).approve();
      await approveTxn.wait();

      // Get the beneficiary's balance after approval
      const after = await ethers.provider.getBalance(beneficiary.getAddress());

      // Check if the balance has increased by the deposit amount
      expect(after.sub(before)).to.eq(deposit);
    });
  });
});
