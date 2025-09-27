// Author: NIKABOU NADJOMBE
// src/components/TokenSwap.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

const TokenSwap = ({ signer, account }) => {
  const [amount, setAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('DAI');
  const [ethBalance, setEthBalance] = useState('0.0');
  const [daiBalance, setDaiBalance] = useState('0.0');

  // Adresse du token DAI sur Goerli
  const DAI_ADDRESS = '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844';
  const ERC20_ABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)"
  ];

  useEffect(() => {
    const fetchBalances = async () => {
      if (!signer || !account) return;

      try {
        const provider = signer.provider;

        // 🔹 Solde ETH
        const balance = await provider.getBalance(account);
        setEthBalance(ethers.utils.formatEther(balance));

        // 🔹 Solde DAI
        const daiContract = new ethers.Contract(DAI_ADDRESS, ERC20_ABI, provider);
        const daiBal = await daiContract.balanceOf(account);
        setDaiBalance(ethers.utils.formatUnits(daiBal, 18));
      } catch (error) {
        console.error("Erreur récupération soldes:", error);
      }
    };

    fetchBalances();
  }, [signer, account]);

  const handleSwap = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Veuillez entrer un montant valide !");
      return;
    }

    toast.info(`🔄 Simulation: swap de ${amount} ${fromToken} vers ${toToken} pour ${account}`);
  };

  return (
    <div style={{ marginTop: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <h3>Token Swap (Goerli Testnet)</h3>

      <p>Solde ETH: {ethBalance}</p>
      <p>Solde DAI: {daiBalance}</p>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>From Token: </label>
        <select value={fromToken} onChange={(e) => setFromToken(e.target.value)}>
          <option value="ETH">ETH</option>
          <option value="DAI">DAI</option>
        </select>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>To Token: </label>
        <select value={toToken} onChange={(e) => setToToken(e.target.value)}>
          <option value="DAI">DAI</option>
          <option value="ETH">ETH</option>
        </select>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <label>Amount: </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: '100px' }}
        />
      </div>

      <button onClick={handleSwap} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>
        Swap
      </button>
    </div>
  );
};

export default TokenSwap;
