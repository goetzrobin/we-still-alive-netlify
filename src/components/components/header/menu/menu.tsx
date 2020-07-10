import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import Logo from '../../../../svgs/logo.svg';
import { MdClose } from 'react-icons/md';

import * as styles from './menu.module.scss';
import { navigate } from 'gatsby';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../../../../state/ui';

interface MenuProps {
  title: string;
  open: boolean;
  onClose: (isOpen: boolean) => void;
}


const Menu = ({ title, open, onClose }: React.PropsWithoutRef<MenuProps>) => {
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    setOpen(open);

  }, [open]);
  const dispatch = useDispatch();

  const closeClicked = () => onClose(false);

  const linkClicked = (to: string) => (event: any) => {
    navigate(to);
    dispatch(toggleMenu());
  };


  return <div className={`${styles.menu} ${isOpen ? '' : styles.hidden}`}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.close} onClick={closeClicked}>
      <MdClose/>
    </div>
    <nav className={styles.navigation}>
    <ul>
      <li className={styles.menuItem} onClick={linkClicked('/')}>HOME</li>
      <li className={styles.menuItem} onClick={linkClicked('/blog')}>BLOG</li>
      <li className={styles.menuItem} onClick={linkClicked('/about')}>AUTHOR</li>
      <li className={styles.menuItem} onClick={linkClicked('/blog')}>OBJECTIVE</li>
      <li className={styles.menuItem} onClick={linkClicked('/about')}>KENYA</li>
      <li className={styles.menuItem} onClick={linkClicked('/about')}>PICTURES</li>
      <li className={styles.menuItem} onClick={linkClicked('/about')}>FUNDRAISING</li>
    </ul>
    </nav>
    <div className={styles.social}>
      <a className={styles.socialIcon} href="https://www.twitter.com">twitter</a>
      <a className={styles.socialIcon} href="https://www.facebook.com">facebook</a>
      <a className={styles.socialIcon} href="https://www.instagram.com">instagram</a>
    </div>
  </div>;
};


Menu.propTypes = {
  siteTitle: PropTypes.string
};

Menu.defaultProps = {
  title: ``
};

export default Menu;
