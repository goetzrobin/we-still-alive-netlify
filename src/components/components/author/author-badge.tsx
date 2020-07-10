import React, {PropsWithoutRef} from 'react';
import * as styles from './author-badge.module.scss';
import {Image, PreviewImage} from '../../../models/Image';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';

const AuthorBadge = ({name = '', title = '', image}: PropsWithoutRef<{ name: string; title: string, image?: Image}>) => {
    const imageInfo: PreviewImage = {alt: `${name} - ${title}`, childImageSharp: image && image.childImageSharp};
    return (
        <figure className={styles.firImageFigure}>
            <a className={styles.firImageover} rel="noopener" target="_blank" href="https://twitter.com/_davideast">
                <PreviewCompatibleImage
                    imageClass={`${styles.firClickcircle}`}
                    imageInfo={imageInfo}
                />
            </a>

            <figcaption>
                <div className={styles.figAuthorFigureTitle}>{name}</div>
                <div className={styles.figAuthorFigurePosition}>{title}</div>
            </figcaption>
        </figure>
    );
};


export default AuthorBadge;
