import React, {PropsWithoutRef} from 'react';
import * as styles from './author-badge.module.scss';
import {Image, PreviewImage} from '../../../models/Image';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';
import {title} from '../header/menu/menu.module.scss';

const AuthorBadge = (props: PropsWithoutRef<{ name: string; title: string, image: Image}>) => {
    const imageInfo: PreviewImage = {alt: `${name} - ${title}`, childImageSharp: props.image && props.image.childImageSharp};
    return (
        <figure className={styles.firImageFigure}>
            <a className={styles.firImageover} rel="noopener" target="_blank" href="https://twitter.com/_davideast">
                <PreviewCompatibleImage
                    imageClass={`${styles.firClickcircle}`}
                    imageInfo={imageInfo}
                />
            </a>

            <figcaption>
                <div className={styles.figAuthorFigureTitle}>{props.name}</div>
                <div className={styles.figAuthorFigurePosition}>{props.title}</div>
            </figcaption>
        </figure>
    );
};


export default AuthorBadge;
