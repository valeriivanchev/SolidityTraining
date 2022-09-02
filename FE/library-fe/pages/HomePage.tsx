import { NextPage } from 'next';
import React from 'react';
import { useSelector } from 'react-redux';
import useWallet from '../utils/wallet/useWallet';
import { selectWalletAddress } from '../utils/wallet/wallet.slice';
import ContractComponent from './components/Contract/ContractComponent';

const HomePage: NextPage = () => {
  const { web3Connect } = useWallet();
  const walletAddress = useSelector(selectWalletAddress);

  return (
    <>
      <h1>FYI The contract is on mumbai!!!</h1>
      {
        walletAddress ?
          <ContractComponent></ContractComponent> :
          <button onClick={web3Connect}>Connect with MetaMask</button>
      }
    </>
  );
}

export default HomePage;
