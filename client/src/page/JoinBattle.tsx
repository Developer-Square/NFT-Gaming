import React, { ReactElement, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import { PageHOC, CustomButton } from '../components';
import { useGlobalContext } from '../../context';
import styles from '../styles';

type Props = {};

const JoinBattle = (props: Props): ReactElement => {
  return <div>JoinBattle</div>;
};

export default PageHOC(
  JoinBattle,
  <>
    Join <br /> a Battle
  </>,
  <>Join already existing battles</>
);
