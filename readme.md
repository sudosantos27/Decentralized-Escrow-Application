# Decentralized Escrow Application - Alchemy Ethereum Developer Bootcamp - Week 5 Project

The Decentralized Escrow Application is a blockchain-based application that enables secure and trustless transactions using an escrow mechanism. The application leverages the Ethereum blockchain and smart contracts to facilitate transactions between parties, providing transparency and security.

The main features of the application include:

- Creation of new escrow contracts with designated arbiter, beneficiary, and deposit amount.
- Approval process by the arbiter to release funds to the beneficiary.
- Display of existing escrow contracts with relevant details.
- User interface for interacting with the escrow contracts.

## Smart Contract

The smart contract `Escrow.sol` serves as the escrow agreement. It includes the following key functionalities:

- Contract initialization with the arbiter, beneficiary, and depositor addresses.
- Approval function triggered by the arbiter to release funds to the beneficiary.
- Event emission upon successful approval.

## Project Structure

The project is structured as follows:

- `addContract.js`: Provides a function to add a new escrow contract to the user interface.
- `deploy.js`: Includes a function to deploy the Escrow smart contract.
- `App.js`: React component that represents the main application logic and user interface.
- `Escrow.js`: React component for displaying individual escrow contracts.
- `index.js`: Entry point of the application, renders the App component.
- Other supporting files and dependencies.


------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

