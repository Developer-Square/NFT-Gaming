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

import { CONTRACT_ADDRESS, ABI } from '../../contract';
import { createEventListeners } from './createEventListeners';
import { GetParams } from '../utils/onboard';

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
  battleName: string;
  setBattleName: Dispatch<SetStateAction<string>>;
  gameData: IGameData;
  battleGround: string;
  setBattleGround: Dispatch<SetStateAction<string>>;
  errorMessage: any;
  setErrorMessage: Dispatch<SetStateAction<any>>;
  player1Ref: any;
  player2Ref: any;
  updateContractAddress: () => void;
}

interface IGameData {
  players: string[];
  pendingBattles: { string: any }[];
  activeBattle: { string: any }[];
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
  const [battleName, setBattleName] = useState('');
  const [gameData, setGameData] = useState<IGameData>({
    players: [],
    pendingBattles: [],
    activeBattle: [],
  });
  const [updateGameData, setUpdateGameData] = useState(0);
  const [battleGround, setBattleGround] = useState('bg-astral');
  const [step, setStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState('');

  const player1Ref = useRef();
  const player2Ref = useRef();

  // Set the wallet address to the state.
  const updateContractAddress = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts',
    });
    if (accounts) setWalletAddress(accounts[0]);
  };

  useEffect(() => {
    const battleGroundFromLocalStorage = localStorage.getItem('BattleGround');

    if (battleGroundFromLocalStorage) {
      setBattleGround(battleGroundFromLocalStorage);
    } else {
      localStorage.setItem('BattleGround', battleGround);
    }
  }, []);

  // Reset web3 onboarding modal params
  useEffect(() => {
    const resetParams = async () => {
      const currentStep = await GetParams();

      setStep(currentStep.step);
    };

    resetParams();

    if (window.ethereum)
      window.ethereum.on('chainChanged', () => resetParams());
    if (window.ethereum)
      window.ethereum.on('accountsChanged', () => resetParams());
  }, []);

  // Handle error messages
  useEffect(() => {
    if (errorMessage) {
      // @ts-ignore
      if (errorMessage.reason) {
        // @ts-ignore
        const parsedErrorMessage = errorMessage.reason
          .slice('execution reverted: '.length)
          .slice(0, -1);

        if (parsedErrorMessage) {
          setShowAlert({
            status: true,
            type: 'failure',
            message: parsedErrorMessage,
          });
        }
      }
    }
  }, [errorMessage]);

  useEffect(() => {
    if (window.ethereum) {
      updateContractAddress();
      window.ethereum.on('accountsChanged', updateContractAddress);
    }
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

    if (walletAddress) setSmartContractAndProvider();
  }, [walletAddress]);

  useEffect(() => {
    if (step !== -1 && contract) {
      createEventListeners({
        navigate,
        contract,
        provider,
        walletAddress,
        setShowAlert,
        setUpdateGameData,
        player1Ref,
        player2Ref,
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

  // Set game data to state
  useEffect(() => {
    const fetchGameData = async () => {
      const fetchedBattles = await contract?.getAllBattles({
        gasLimit: 200000,
      });
      const pendingBattles = fetchedBattles.filter(
        (battle) => battle.battleStatus === 0
      );
      let activeBattle = [];

      fetchedBattles.forEach((battle) => {
        if (
          battle.players.find(
            (player) => player.toLowerCase() === walletAddress.toLowerCase()
          )
        ) {
          if (battle.winner.startsWith('0x00')) {
            activeBattle = battle;
          }
        }
      });

      setGameData({
        ...gameData,
        activeBattle,
        pendingBattles: pendingBattles.slice(1),
      });
    };

    if (contract) fetchGameData();
  }, [contract, updateGameData]);

  return (
    <GlobalContext.Provider
      value={{
        contract,
        walletAddress,
        showAlert,
        setShowAlert,
        battleName,
        setBattleName,
        gameData,
        battleGround,
        setBattleGround,
        errorMessage,
        setErrorMessage,
        player1Ref,
        player2Ref,
        updateContractAddress,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
