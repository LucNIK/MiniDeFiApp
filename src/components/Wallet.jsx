// src/components/Wallet.jsx
import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure && toast.configure(); // sécurité si configure n'existe pas

const Wallet = ({ setProvider, setSigner, setAccount }) => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error("MetaMask n'est pas installé !");
        return;
      }

      // Provider via MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);

      // Demande de connexion
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const account = await signer.getAddress();

      // Définition des states pour l'app
      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setAddress(account);
      setConnected(true);

      // 🔹 Récupération du solde sur Goerli
      const balanceWei = await provider.getBalance(account);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(balanceEth).toFixed(4));

      toast.success(`Wallet connecté: ${account}`);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la connexion au wallet.");
    }
  };

  return (
    <div style={{ margin: '1rem 0' }}>
      {connected ? (
        <>
          <p style={{ color: 'green', fontWeight: 'bold' }}>
            Wallet connecté : {address}
          </p>
          <p>Solde Goerli : {balance} ETH</p>
        </>
      ) : (
        <button 
          onClick={connectWallet} 
          style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}
        >
          Connecter Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
