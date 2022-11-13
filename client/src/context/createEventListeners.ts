import { ethers, Contract } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { IShowAlert } from '.';

import { ABI } from '../../contract';
import { sparcle, playAudio } from '../utils/animation';
import { defenseSound } from '../assets';

interface IEventListeners {
  navigate: NavigateFunction;
  contract: Contract;
  provider: any;
  walletAddress: string;
  setShowAlert: Dispatch<SetStateAction<IShowAlert>>;
  setUpdateGameData: Dispatch<SetStateAction<number>>;
  player1Ref: any;
  player2Ref: any;
}

const emptyAccount = '0x0000000000000000000000000000000000000000';

const addNewEvent = (eventFilter, provider, cb) => {
  provider.removeListener(eventFilter);

  provider.on(eventFilter, (logs) => {
    const parsedLog = new ethers.utils.Interface(ABI).parseLog(logs);

    cb(parsedLog);
  });
};

const getCoords = (cardRef) => {
  const { left, top, width, height } = cardRef.current.getBoundingClientRect();

  return {
    pageX: left + width / 2,
    pageY: top + height / 2.25,
  };
};

export const createEventListeners = ({
  navigate,
  contract,
  provider,
  walletAddress,
  setShowAlert,
  setUpdateGameData,
  player1Ref,
  player2Ref,
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

  const roundEndedEventFilter = contract.filters.RoundEnded();

  addNewEvent(roundEndedEventFilter, provider, ({ args }) => {
    console.log('Rounded ended!', args, walletAddress);

    for (let i = 0; i < args.damagedPlayers.length; i++) {
      if (args.damagedPlayers[i] !== emptyAccount) {
        if (args.damagedPlayers[i] === walletAddress) {
          sparcle(getCoords(player1Ref));
        } else if (args.damagedPlayers[i] !== walletAddress) {
          sparcle(getCoords(player2Ref));
        }
      } else {
        playAudio(defenseSound);
      }
    }

    setUpdateGameData((prevUpdateGameData) => prevUpdateGameData + 1);
  });
};
