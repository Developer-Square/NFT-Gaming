import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHOC } from '../components';
import { useGlobalContext } from '../context';

type Props = {};

const LandingPage = (props: Props) => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();

  // Check for wallet address
  useEffect(() => {
    if (window.ethereum && walletAddress) {
      navigate('/');
    }
  }, [walletAddress]);
  return (
    <div className='text-white font-rajdhani font-normal text-[24px]'>
      Disclaimer: You'll need to install Core wallet <br /> as a chrome
      extension inorder for you to play the game.
      <br />
      <p className='mt-3'>
        Kindly follow the following link:{' '}
        <a href='#' target='_blank' className='font-bold underline'>
          Step by Step Guide
        </a>
      </p>
    </div>
  );
};

export default PageHOC(
  LandingPage,
  <>
    Welcome to Avax Gods <br /> a Web3 NFT Card Game
  </>,
  <>
    Connect your wallet to start palying <br /> the ultimate Web3 Battle Card
    Game
  </>
);
