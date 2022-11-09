import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomButton from './CustomButton';
import { useGlobalContext } from '../context';
import { player01, player02 } from '../assets';
import styles from '../styles';

type Props = {};

const PlayerBox = ({
  walletAddress,
  img,
}: {
  img: any;
  walletAddress: string | undefined;
}) => {
  return (
    <div className={`${styles.flexCenter} flex-col`}>
      <img src={img} className={styles.gameLoadPlayerImg} alt='player' />
      <p className={styles.gameLoadPlayerText}>{walletAddress}</p>
    </div>
  );
};

const GameLoad = (props: Props): ReactElement => {
  const { walletAddress } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <div className={`${styles.flexBetween} ${styles.gameLoadContainer}`}>
      <div className={styles.gameLoadBtnBox}>
        <CustomButton
          title='Choose Battleground'
          handleClick={() => navigate('/battleground')}
          restStyles='mt-6'
        />
      </div>

      <div className={`flex-1 ${styles.flexCenter} flex-col`}>
        <h1 className={`${styles.headText} text-center`}>
          Waiting for a <br /> worthy opponent...
        </h1>
        <p className={styles.gameLoadText}>
          Protip: while you're waiting, choose your preferred battleground
        </p>

        <div className={styles.gameLoadPlayersBox}>
          <PlayerBox
            img={player01}
            walletAddress={walletAddress?.slice(0, 30)}
          />

          <h2 className={styles.gameLoadVS}>Vs</h2>

          <PlayerBox img={player02} walletAddress={'????????????'} />
        </div>
      </div>
    </div>
  );
};

export default GameLoad;
