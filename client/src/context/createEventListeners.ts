import { ethers, Contract } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IShowAlert } from '.';

import { ABI } from '../../contract';

interface IEventListeners {
  navigate: NavigateFunction;
  contract: Contract;
  provider: any;
  walletAddress: string;
  setShowAlert: Dispatch<SetStateAction<IShowAlert>>;
  setUpdateGameData: Dispatch<SetStateAction<number>>;
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
  setUpdateGameData,
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

  const newBattleEventFilter = contract.filters.NewBattle();

  addNewEvent(newBattleEventFilter, provider, ({ args }) => {
    console.log('New battle started!', args, walletAddress);

    if (
      walletAddress.toLowerCase() === args.player1.toLowerCase() ||
      walletAddress.toLowerCase() === args.player2.toLowerCase()
    ) {
      navigate(`/battle/${args.battleName}`);
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });

  const battleMoveEventFilter = contract.filters.BattleMove();

  addNewEvent(battleMoveEventFilter, provider, ({ args }) => {
    console.log('Battle move initiated!', args);
  });
};
