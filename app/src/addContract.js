// Import ethers library from 'ethers' package
import { ethers } from 'ethers';

// Create a new Web3Provider using the Ethereum provider
const provider = new ethers.providers.Web3Provider(ethereum);

// Function to add a contract to the UI and handle approval
export default async function addContract(
  id,
  contract,
  arbiter,
  beneficiary,
  value
) {
  // Generate a unique button ID based on the contract ID
  const buttonId = `approve-${id}`;

  // Get the container element
  const container = document.getElementById('container');

  // Append the HTML content for the contract to the container
  container.innerHTML += createHTML(buttonId, arbiter, beneficiary, value);

  // Listen for the 'Approved' event emitted by the contract
  contract.on('Approved', () => {
    // Update the button appearance and text when the contract is approved
    document.getElementById(buttonId).className = 'complete';
    document.getElementById(buttonId).innerText = "✓ It's been approved!";
  });

  // Add a click event listener to the button
  document.getElementById(buttonId).addEventListener('click', async () => {
    // Get the signer from the provider
    const signer = provider.getSigner();

    // Call the 'approve' function on the contract using the signer
    await contract.connect(signer).approve();
  });
}

// Function to generate HTML content for the contract
function createHTML(buttonId, arbiter, beneficiary, value) {
  return `
    <div class="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> ${arbiter} </div>
        </li>
        <li>
          <div> Beneficiary </div>
          <div> ${beneficiary} </div>
        </li>
        <li>
          <div> Value </div>
          <div> ${value} </div>
        </li>
        <div class="button" id="${buttonId}">
          Approve
        </div>
      </ul>
    </div>
  `;
}
