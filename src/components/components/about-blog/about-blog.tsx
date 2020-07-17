import React, {PropsWithoutRef} from 'react';
import * as styles from './about-blog.module.scss';
import {Image} from '../../../models/Image';
import AuthorBadge from '../author/author-badge';
import {Link} from 'gatsby';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';

interface AboutBlogProps {
    heading: string;
    text: string;
    author?: {
        name: string;
        title: string;
        image?: Image;
    };
}

const AboutBlog = ({heading = '', text = '', author}: PropsWithoutRef<AboutBlogProps>) => {
    return (
        <>
            <div className={styles.aboutBlogContainer}>
                <h1>{heading}</h1>
                <div className={styles.aboutBlog}>
                    <div className={styles.aboutBlogText}>
                        <div>
                            <p>{text}</p>
                            {author ?
                                <div className={styles.author}>
                                    <AuthorBadge image={author.image as Image} name={author.name}
                                                 title={author.title}/>
                                </div>
                                : null}
                        </div>
                      <Link to="/blog"><button className={`btn btn-black ${styles.button}`}>READ MORE</button></Link>
                    </div>
                    <div className={styles.aboutBlogImage}>
                        {author ? <PreviewCompatibleImage imageInfo={author.image as Image} /> : null}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutBlog;
