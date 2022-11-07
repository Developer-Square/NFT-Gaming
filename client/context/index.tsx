import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { CONTRACT_ADDRESS, ABI } from '../contract';

interface IGlobalContext {
  contract: Contract | undefined;
  walletAddress: string | undefined;
}

// @ts-ignore
const GlobalContext = createContext<IGlobalContext>();

export const GlobalContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [contract, setContract] = useState<Contract>();

  // Set the wallet address to the state.
  const updateContractAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    updateContractAddress();

    window.ethereum.on('accountsChanged', updateContractAddress);
  }, []);

  // Set the provider and smart contract to the state.
  useEffect(() => {
    const setSmartContractAndProvider = async () => {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.providers.Web3Provider(connection);
      const signer = newProvider.getSigner();
      const newContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      setContract(newContract);
      setProvider(newProvider);
    };

    setSmartContractAndProvider();
  });

  return (
    <GlobalContext.Provider value={{ contract, walletAddress }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
