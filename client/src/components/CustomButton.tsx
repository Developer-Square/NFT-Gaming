import React from 'react';

import styles from '../styles';

type Props = {
  title: string;
  handleClick: () => void;
  restStyles: string;
};

const CustomButton = ({ title, handleClick, restStyles }: Props) => {
  return (
    <button
      type='button'
      className={`${styles.btn} ${restStyles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
