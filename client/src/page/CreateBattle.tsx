import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../context';
import { CustomButton, CustomInput, GameLoad, PageHOC } from '../components';
import styles from '../styles';

const CreateBattle = (): ReactElement => {
  const { battleName, setBattleName, contract, gameData } = useGlobalContext();
  const navigate = useNavigate();
  const [waitBattle, setWaitBattle] = useState(false);

  useEffect(() => {
    // @ts-ignore
    if (gameData.activeBattle.battleStatus === 0) {
      setWaitBattle(true);
    }
  }, [gameData]);

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null;

    try {
      await contract?.createBattle(battleName);
      setWaitBattle(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className='flex flex-col mb-5'>
        {waitBattle ? <GameLoad /> : null}
        <CustomInput
          label='Battle'
          placeholder='Enter battle name'
          value={battleName}
          onChangeHandler={setBattleName}
        />

        <CustomButton
          title='Create Battle'
          handleClick={handleClick}
          restStyles='mt-6'
        />

        <p
          className={`${styles.infoText} mt-6`}
          onClick={() => navigate('/join-battle')}
        >
          Or join already existing battles
        </p>
      </div>
    </>
  );
};

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join you</>
);
