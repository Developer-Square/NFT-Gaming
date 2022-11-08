import { ethers, Contract } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IShowAlert } from '.';

import { ABI } from '../contract';

interface IEventListeners {
  navigate: NavigateFunction;
  contract: Contract;
  provider: any;
  walletAddress: string;
  setShowAlert: Dispatch<SetStateAction<IShowAlert>>;
}

const addNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
}: IEventListeners) => {
  const newPlayerEventFilter = contract.filters.NewPlayer();

  addNewEvent(newPlayerEventFilter, provider, ({ args }) => {
    console.log('New player created!', args);

    if (walletAddress === args.owner) {
      setShowAlert({
        status: true,
        type: 'success',
        message: 'Player has been successfully registered',
      });
    }
  });
};
