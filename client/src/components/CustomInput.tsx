import React, { Dispatch } from 'react';

import styles from '../styles';

const regex = /^[A-Za-z0-9]+$/;

type Props = {
  label: string;
  placeholder: string;
  value: string;
  onChangeHandler: Dispatch<React.SetStateAction<string>>;
};

const CustomInput = ({ label, placeholder, value, onChangeHandler }: Props) => {
  return (
    <>
      <label htmlFor='name' className={styles.label}>
        {label}
      </label>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (e.target.value === '' || regex.test(e.target.value)) {
            onChangeHandler(e.target.value);
          }
        }}
        className={styles.input}
      />
    </>
  );
};

export default CustomInput;
