// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
    address public arbiter;      // Address of the arbiter (trusted third party)
    address public beneficiary;  // Address of the beneficiary (party receiving funds)
    address public depositor;    // Address of the depositor (party depositing funds)

    bool public isApproved;      // Flag indicating whether the funds have been approved

    constructor(address _arbiter, address _beneficiary) payable {
        arbiter = _arbiter;
        beneficiary = _beneficiary;
        depositor = msg.sender;
    }

    event Approved(uint);

    /**
     * @dev Approves the release of funds to the beneficiary.
     * Only the arbiter can call this function.
     */
    function approve() external {
        require(msg.sender == arbiter, "Only the arbiter can approve");
        uint balance = address(this).balance;

        // Send the entire contract balance to the beneficiary
        (bool sent, ) = payable(beneficiary).call{value: balance}("");
        require(sent, "Failed to send Ether");

        // Emit an event indicating the approval and the transferred balance
        emit Approved(balance);

        // Set the isApproved flag to true
        isApproved = true;
    }
}
