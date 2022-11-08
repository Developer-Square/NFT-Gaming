import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { logo, heroImg } from '../assets';
import { useGlobalContext } from '../../context';
import styles from '../styles';
import Alert from './Alert';

const PageHOC =
  (
    Component: () => ReactElement,
    title: JSX.Element,
    description: JSX.Element
  ) =>
  () => {
    const navigate = useNavigate();
    const { showAlert } = useGlobalContext();
    return (
      <div className={styles.hocContainer}>
        {showAlert.status ? (
          <Alert type={showAlert.type} message={showAlert.message} />
        ) : null}
        <div className={styles.hocContentBox}>
          <img
            src={logo}
            className={styles.hocLogo}
            alt='logo'
            onClick={() => navigate('/')}
          />

          <div className={styles.hocBodyWrapper}>
            <div className='flex flex-row w-full'>
              <h1 className={`flex ${styles.headText}`}>{title}</h1>
            </div>
            <p className={`${styles.normalText} my-10`}>{description}</p>

            <Component />
          </div>

          <p className={styles.footerText}>Made with ❤️ by tecHive LLP</p>
        </div>

        <div className='flex flex-1'>
          <img
            src={heroImg}
            alt='hero-img'
            className='w-full xl:h-full object-cover'
          />
        </div>
      </div>
    );
  };

export default PageHOC;
