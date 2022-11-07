import React, { ReactElement } from 'react';
import { PageHOC } from '../components';

const Home = (): ReactElement => {
  return <div></div>;
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
