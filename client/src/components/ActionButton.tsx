import React from 'react';

import styles from '../styles';

type Props = {
  imgUrl: string;
  handleClick: () => void;
  restStyles: string;
};

const ActionButton = ({ imgUrl, handleClick, restStyles }: Props) => {
  return (
    <div
      className={`${styles.gameMoveBox} ${styles.flexCenter} ${styles.glassEffect} ${restStyles}`}
    >
      <img src={imgUrl} alt='action_img' className={styles.gameMoveIcon} />
    </div>
  );
};

export default ActionButton;
