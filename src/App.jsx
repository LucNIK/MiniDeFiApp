// Author: NIKABOU NADJOMBE
// src/App.jsx
import { useState } from 'react';
import './App.css';
import Wallet from './components/Wallet.jsx';
import TokenSwap from './components/TokenSwap.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);

  const [balances, setBalances] = useState({
    ETH: 0.0,
    DAI: 0.0
  });

  return (
    <div className="app-container">
      {/* HEADER */}
      <header className="app-header">
        <h1>Mini-DeFi Wallet</h1>
        {account ? (
          <span className="wallet-address">{account}</span>
        ) : (
          <Wallet setProvider={setProvider} setSigner={setSigner} setAccount={setAccount} />
        )}
      </header>

      {/* BALANCES */}
      {account && (
        <section className="balances">
          {Object.keys(balances).map((token) => (
            <div key={token} className="balance-card">
              <h3>{token}</h3>
              <p>{balances[token]}</p>
            </div>
          ))}
        </section>
      )}

      {/* TOKEN SWAP */}
      {account && (
        <section className="swap-section">
          <TokenSwap 
            provider={provider} 
            signer={signer} 
            account={account} 
            balances={balances}
            setBalances={setBalances}
          />
        </section>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
