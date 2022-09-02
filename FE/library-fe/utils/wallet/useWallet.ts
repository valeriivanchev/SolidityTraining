import { Contract, providers, Signer } from "ethers";
import { useCallback } from "react";
import { useAppDispatch } from "../dispatch";
import { setWalletAddress } from "./wallet.slice";

export const useWallet = () => {
  const dispatch = useAppDispatch();

  const web3Connect = useCallback(async () => {
    const [address] = await (window as any).ethereum.request({
      method: 'eth_requestAccounts',
      params: []
    });
    dispatch(setWalletAddress(address));
  }, [dispatch]);

  const web3Disconnect = useCallback(async () => {
    window.location.reload();
  }, []);

  const callContract = useCallback(async (contractAddress: string, abi: any, methodName: string, ...params: Parameters<any>) => {
    let contract;
    let signer;
    const metamaskWeb3Provider = new providers.Web3Provider((window as any).ethereum, 'any');
    signer = await metamaskWeb3Provider.getSigner();
    contract = new Contract(<string>contractAddress, abi, metamaskWeb3Provider);

    return (contract as Contract).connect(<Signer>signer)[methodName](...params);
  }, []);

  return {
    web3Connect,
    web3Disconnect,
    callContract
  }
}

export default useWallet;