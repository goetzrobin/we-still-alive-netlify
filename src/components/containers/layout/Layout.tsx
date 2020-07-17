import React, {PropsWithChildren} from 'react';
import useSiteMetadata from '../../SiteMetadata';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import './layout.css';
import '../../../styles/styles.scss';

import * as styles from './layout.module.scss';
import {Image, PreviewImage} from '../../../models/Image';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';


const Layout = ({children, isLandingPage = false, image}: PropsWithChildren<{ isLandingPage?: boolean; image?: Image | string | undefined }>) => {
    const {title, description} = useSiteMetadata();
    const imageInfo: PreviewImage = {image};

    const generateLandingImage: () => any = () => {
        return isLandingPage && image ? <div className={styles.mainImageContainer}><PreviewCompatibleImage imageClass={styles.mainImage} imageInfo={imageInfo}/></div> : null;
    };

    return (
        <>
            <Header isLandingPage={isLandingPage} siteTitle={title}/>
            {generateLandingImage()}
            <main className={styles.mainContent}>{children}</main>
            <Footer/>
        </>
    );
};

export default Layout;
