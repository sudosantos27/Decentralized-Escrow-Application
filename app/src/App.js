// Import ethers library from 'ethers' package
import { ethers } from 'ethers';
// Import useEffect and useState hooks from 'react' package
import { useEffect, useState } from 'react';
// Import deploy function from the local 'deploy' file
import deploy from './deploy';
// Import Escrow component from the local 'Escrow' file
import Escrow from './Escrow';

// Create a new Web3Provider using the injected Ethereum provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Function to approve an escrow contract
export async function approve(escrowContract, signer) {
  // Connect the signer to the escrow contract and call the approve function
  const approveTxn = await escrowContract.connect(signer).approve();
  await approveTxn.wait();
}

// App component
function App() {
  // State variables
  const [escrows, setEscrows] = useState([]);
  const [account, setAccount] = useState();
  const [signer, setSigner] = useState();

  // useEffect hook to get the Ethereum accounts and signer
  useEffect(() => {
    async function getAccounts() {
      // Request the Ethereum accounts from the provider
      const accounts = await provider.send('eth_requestAccounts', []);

      // Set the account and signer states
      setAccount(accounts[0]);
      setSigner(provider.getSigner());
    }

    getAccounts();
  }, [account]);

  // Function to create a new escrow contract
  async function newContract() {
    // Get the beneficiary, arbiter, and value from the input fields
    const beneficiary = document.getElementById('beneficiary').value;
    const arbiter = document.getElementById('arbiter').value;
    const value = ethers.BigNumber.from(document.getElementById('wei').value);

    // Deploy the escrow contract
    const escrowContract = await deploy(signer, arbiter, beneficiary, value);

    // Create a new escrow object
    const escrow = {
      address: escrowContract.address,
      arbiter,
      beneficiary,
      value: value.toString(),
      handleApprove: async () => {
        // Set up an event listener for the 'Approved' event
        escrowContract.on('Approved', () => {
          document.getElementById(escrowContract.address).className = 'complete';
          document.getElementById(escrowContract.address).innerText =
            "✓ It's been approved!";
        });

        // Call the approve function
        await approve(escrowContract, signer);
      },
    };

    // Add the new escrow to the escrows array
    setEscrows([...escrows, escrow]);
  }

  // Render the App component
  return (
    <>
      <div className="contract">
        <h1> New Contract </h1>
        <label>
          Arbiter Address
          <input type="text" id="arbiter" />
        </label>

        <label>
          Beneficiary Address
          <input type="text" id="beneficiary" />
        </label>

        <label>
          Deposit Amount (in Wei)
          <input type="text" id="wei" />
        </label>

        <div
          className="button"
          id="deploy"
          onClick={(e) => {
            e.preventDefault();
            // Call the newContract function when the button is clicked
            newContract();
          }}
        >
          Deploy
        </div>
      </div>

      <div className="existing-contracts">
        <h1> Existing Contracts </h1>

        <div id="container">
          {/* Render the Escrow component for each escrow in the escrows array */}
          {escrows.map((escrow) => {
            return <Escrow key={escrow.address} {...escrow} />;
          })}
        </div>
      </div>
    </>
  );
}

export default App;
