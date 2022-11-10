import React from 'react';
import { IPlayer } from '../page/Battle';

type Props = {
  card: IPlayer | undefined;
  title: string | undefined;
  cardRef: string;
  restStyles?: string;
  playerTwo?: boolean;
};

const Card = (props: Props) => {
  return <div>Card</div>;
};

export default Card;
