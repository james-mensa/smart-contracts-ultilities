pragma solidity ^0.8.20;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JMCoin is ERC20 {

 address public owner;


    constructor(uint256 initialSupply) ERC20("JAMES Coin", "JCoin") {
        _mint(msg.sender, initialSupply);

        owner=msg.sender;
    }

     // Function to convert Ether to MensahCoin tokens
    function deposit() external payable {
        require(msg.value > 0, "Value sent must be greater than 0");

        // Calculate the amount of tokens to mint based on the Ether sent
        uint256 tokensToMint = msg.value;

        // Mint tokens and transfer to the sender
        _mint(msg.sender, tokensToMint);
    }

function send(address payable _to) public payable {
       
        (bool sent,) = _to.call{value: msg.value}("");
        require(sent, "Failed to send Ether");
    }
    // Fallback function to receive Ether
    receive() external payable {
     
    }

    function mint(address account, uint256 amount) external {
        require(msg.sender == owner, "Only owner can mint");
        _mint(account, amount);
    }
}