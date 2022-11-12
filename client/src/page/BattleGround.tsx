import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from '../styles';
import { Alert } from '../components';
import { useGlobalContext } from '../context';
import { battlegrounds } from '../assets';

type Props = {};

interface IGround {
  id: string;
  image: any;
  name: string;
}

const BattleGround = (props: Props) => {
  const { setShowAlert, showAlert, setBattleGround } = useGlobalContext();
  const navigate = useNavigate();

  const handleBattleGroundChoice = (ground: IGround) => {
    setBattleGround(ground.id);
    localStorage.setItem('BattleGround', ground.id);
    setShowAlert({
      status: true,
      type: 'info',
      message: `${ground.name} is battle ready!`,
    });

    setTimeout(() => {
      navigate(-1);
    }, 1000);
  };

  return (
    <div className={`${styles.flexCenter} ${styles.battlegroundContainer}`}>
      {showAlert.status ? (
        <Alert type={showAlert.type} message={showAlert.message} />
      ) : null}
      <h1 className={`${styles.headText} text-center`}>
        Choose your
        <span className='text-siteViolet'> Battle </span>
        Ground
      </h1>

      <div className={`${styles.flexCenter} ${styles.battleGroundsWrapper}`}>
        {battlegrounds.map((ground) => (
          <div
            key={ground.id}
            className={`${styles.flexCenter} ${styles.battleGroundCard}`}
            onClick={() => handleBattleGroundChoice(ground)}
          >
            <img
              src={ground.image}
              alt={ground.name}
              className={styles.battleGroundCardImg}
            />

            <div className='info absolute'>
              <p className={styles.battleGroundCardText}>{ground.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleGround;
