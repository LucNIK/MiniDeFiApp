# Mini-DeFi App (v1-demo)

**Author:** NIKABOU NADJOMBE

## Overview

This project is a mini decentralized finance (DeFi) application built with **React + Vite + Ethers.js**.  
It allows users to connect their Ethereum wallets (MetaMask) and simulate token swaps on a testnet.

### Features (v1-demo)
- Wallet connection via MetaMask
- Display connected wallet address
- Simulated token swap (ETH ↔ DAI)
- Toast notifications for actions
- Fully responsive UI inspired by Binance wallet design

### Planned Features for v2-full
- Real token swaps via Uniswap V3 SDK
- Display real balances (ETH and ERC20 tokens) from the testnet
- Transaction history list
- Support for multiple testnet tokens

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/MiniDeFiApp.git
cd MiniDeFiApp```

Install dependencies:

npm install


Start the development server:

npm run dev


Open the app in your browser:

http://localhost:5173/

Usage

Connect your MetaMask wallet.

Enter the amount and select tokens for swap (simulation only in v1-demo).

Click "Swap" to see a simulated transaction notification.

Notes

This demo runs on Ethereum testnets (Goerli or Sepolia).

Ensure MetaMask is installed and configured with a testnet account.
