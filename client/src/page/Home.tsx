import React, { ReactElement } from 'react';
import { useGlobalContext } from '../../context';
import { PageHOC } from '../components';

const Home = (): ReactElement => {
  // @ts-ignore
  const { contract, walletAddress } = useGlobalContext();
  return (
    <div>
      <h1 className='text-xl text-white'>{walletAddress}</h1>
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
