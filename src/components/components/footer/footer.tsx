import React from 'react';
// @ts-ignore
import Logo from '../../../svgs/logo-white.svg';
import * as styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Logo/>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  );
};

export default Footer;
