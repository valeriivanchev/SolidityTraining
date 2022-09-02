import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import useWallet from '../utils/wallet/useWallet';
import { selectWalletAddress } from '../utils/wallet/wallet.slice';

const HomePage: NextPage = () => {
  const { web3Connect } = useWallet();
  const walletAddress = useSelector(selectWalletAddress);

  return (
    <>
      <h1>FYI The contract is on mumbai!!!</h1>
      {
        walletAddress ?
          <span>You connected with {walletAddress}</span> :
          <button onClick={web3Connect}>Connect with MetaMask</button>
      }
    </>
  );
}

export default HomePage;
