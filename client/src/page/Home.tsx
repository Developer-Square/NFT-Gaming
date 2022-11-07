import React, { ReactElement, useState } from 'react';
import { useGlobalContext } from '../../context';
import { CustomButton, CustomInput, PageHOC } from '../components';

const Home = (): ReactElement => {
  // @ts-ignore
  const { contract, walletAddress } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');

  return (
    <div className='flex flex-col'>
      <CustomInput
        label='Name'
        placeholder='Enter your player name'
        value={playerName}
        onChangeHandler={setPlayerName}
      />

      <CustomButton title='Register' handleClick={() => {}} restStyles='mt-6' />
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
