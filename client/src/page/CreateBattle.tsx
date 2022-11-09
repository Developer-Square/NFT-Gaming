import React, { ReactElement, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGlobalContext } from '../../context';
import { CustomButton, CustomInput, PageHOC } from '../components';
import styles from '../styles';

const CreateBattle = (): ReactElement => {
  const { battleName, setBattleName, contract } = useGlobalContext();
  const navigate = useNavigate();

  const handleClick = () => {};
  return (
    <>
      <div className='flex flex-col mb-5'>
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
