import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, CustomInput, PageHOC } from '../components';

const Home = (): ReactElement => {
  // @ts-ignore
  const { contract, walletAddress, setShowAlert, gameData, setErrorMessage } =
    useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    if (playerName.length) {
      try {
        const playerExists = await contract?.isPlayer(walletAddress);
        if (!playerExists) {
          await contract?.registerPlayer(playerName, playerName, {
            gasLimit: 500000,
          });
          setShowAlert({
            status: true,
            type: 'info',
            message: `${playerName} is being summoned!`,
          });
        }
      } catch (error) {
        setErrorMessage(error);
      }
    } else {
      setShowAlert({
        status: true,
        type: 'failure',
        message: 'Please enter a name!',
      });
    }
  };

  // Check for wallet address
  useEffect(() => {
    if (!window.ethereum && !walletAddress) {
      navigate('/landing-page');
    }
  }, []);

  useEffect(() => {
    const checkForPlayerToken = async () => {
      const playerExists = await contract?.isPlayer(walletAddress);
      const playerTokenExists = await contract?.isPlayerToken(walletAddress);

      if (playerExists && playerTokenExists) navigate('/create-battle');
    };

    if (contract) checkForPlayerToken();
  }, [contract]);

  useEffect(() => {
    if (gameData.players.length > 0)
      // @ts-ignore
      navigate(`/battle/${gameData.activeBattle.name}`);
  }, [gameData]);

  return (
    <div className='flex flex-col'>
      <CustomInput
        label='Name'
        placeholder='Enter your player name'
        value={playerName}
        onChangeHandler={setPlayerName}
      />

      <CustomButton
        title='Register'
        handleClick={handleClick}
        restStyles='mt-6'
      />
    </div>
  );
};

export default PageHOC(
  Home,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start palying <br /> the ultimate Web3 Battle Card
    Game
  </>
);
