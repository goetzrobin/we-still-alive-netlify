import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
// @ts-ignore
import Logo from '../../../svgs/logo.svg';
// @ts-ignore
import HamburgerMenu from '../../../svgs/menu.svg';
import * as styles from './header.module.scss';
import { toggleMenu, uiSelector } from '../../../state/ui';

import Menu from './menu/menu';
import { Link } from 'gatsby';

interface HeaderProps {
  siteTitle: string;
  isLandingPage: boolean;
}



const Header = ({ siteTitle, isLandingPage }: React.PropsWithoutRef<HeaderProps>) => {

  const { menuOpen } = useSelector(uiSelector);
  const dispatch = useDispatch();

  const toggleMenuOnClick = () => dispatch(toggleMenu());


  return <header
    className={`${styles.header} ${isLandingPage ? styles.landingPage : null}`}
  >
    <Link to="/"><Logo/></Link>
    <HamburgerMenu className={styles.hamburger} onClick={toggleMenuOnClick}/>
    <Menu title={siteTitle} open={menuOpen} onClose={toggleMenuOnClick}/>
  </header>;
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
