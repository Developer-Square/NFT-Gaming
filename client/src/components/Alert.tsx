import React from 'react';

import { AlertIcon } from '../assets';
import styles from '../styles';

type Props = {
  type: string;
  message: string;
};

const Alert = ({ type, message }: Props) => {
  return (
    <div className={`${styles.alertContainer} ${styles.flexCenter}`}>
      <div className={`${styles.alertWrapper} ${styles[type]}`}>
        <AlertIcon type={type} /> {message}
      </div>
    </div>
  );
};

export default Alert;
