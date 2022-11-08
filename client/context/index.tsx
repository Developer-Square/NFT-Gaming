import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Contract, ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useNavigate } from 'react-router-dom';

import { CONTRACT_ADDRESS, ABI } from '../contract';
import { createEventListeners } from './createEventListeners';

export interface IShowAlert {
  status: boolean;
  type: string;
  message: string;
}

interface IGlobalContext {
  contract: Contract | undefined;
  walletAddress: string | undefined;
  showAlert: IShowAlert;
  setShowAlert: Dispatch<SetStateAction<IShowAlert>>;
}

// @ts-ignore
const GlobalContext = createContext<IGlobalContext>();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [walletAddress, setWalletAddress] = useState('');
  const [provider, setProvider] = useState<any>();
  const [contract, setContract] = useState<Contract>();
  const [showAlert, setShowAlert] = useState({
    status: false,
    type: 'info',
    message: '',
  });

  // Set the wallet address to the state.
  const updateContractAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
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
  }, [walletAddress]);

  useEffect(() => {
    if (contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,
      });
    }
  }, [contract]);

  useEffect(() => {
    if (showAlert?.status) {
      const timer = setTimeout(() => {
        setShowAlert({ status: false, type: 'info', message: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <GlobalContext.Provider
      value={{ contract, walletAddress, showAlert, setShowAlert }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
