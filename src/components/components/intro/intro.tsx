import React, {PropsWithChildren} from 'react';
// @ts-ignore
import Logo from '../../../svgs/logo.svg';
import * as styles from './intro.module.scss';
import AuthorBadge from '../author/author-badge';
import Img from 'gatsby-image';
import {author} from './intro.module.scss';
import {Image} from '../../../models/Image';

interface IntroProps {
    mainTitle?: boolean;
    title?: string;
    heading: string;
    author?: {
        name: string;
        title: string;
        image?: Image;
    };
    imageFluid?: any;
}

const Intro = (props: PropsWithChildren<IntroProps>) => {
    return (
        <div className={styles.intro}>
            <div className={styles.introContainer}>
                <div className={!props.imageFluid ? styles.bigGraphicWrapper : styles.bigImageWrapper}>
                    {!props.imageFluid ?
                        <div className={styles.bigGraphic}><Logo/></div> :
                        <div className={styles.bigImage}><Img fluid={props.imageFluid} Tag="div"/></div>
                    }
                </div>
                <div className={styles.text}>
                    <h1 className={styles.textHeading}>{props.heading}</h1>
                    <div className={styles.textContent}>
                        {props.children}
                    </div>
                    {props.author ?
                        <div className={styles.author}>
                            <AuthorBadge image={props.author.image as Image} name={props.author.name}
                                         title={props.author.title}/>
                        </div>
                        : null}
                </div>
            </div>
        </div>
    );
};

export default Intro;
