## Description

This application demonstrates bridging USDC from the Noble Testnet to Ethereum Sepolia. It serves as an educational resource for learning how to interact with the Noble chain using CosmJS, connect to the Keplr wallet (browser extension), and utilize the Cross-Chain Transfer Protocol (CCTP).

Key Features

1. Keplr Wallet Integration:
   - Connect and disconnect with kepler wallet to visualise balance.
2. CCTP (Cross-Chain Transfer Protocol):
   - Leverages Circle’s CCTP to automate USDC burn and mint mechanics during the bridging process.
3. Transaction Broadcasting:
   - Broadcasts burn transactions to the Noble chain using the Keplr Extension's signer.

References

- Circle CCTP Example Repository
- Circle Developers Guide

Tech Stack

- Frontend: Next, React, Tailwind, Shadcn,
- Blockchain Interaction: Cosmos-kit, Keplr Wallet
- Protocol: Cross-Chain Transfer Protocol (CCTP)

This project provides a foundational understanding of cross-chain mechanics, blockchain interaction through wallets, and how protocols like CCTP enable seamless asset transfers across different chains.

## Screenshots

![Alt text](images/connect-wallet.gif "Before connecting")

<center>Connecting with kepler to see current USDC balance</center>
