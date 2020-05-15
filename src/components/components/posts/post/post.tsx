import React, {PropsWithoutRef} from 'react';
import * as styles from './post.module.scss';
import Image from '../../image/image';
import { Link } from 'gatsby';
import PreviewCompatibleImage from '../../../PreviewCompatibleImage';

interface PostProps {
  url: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
}



const Post = ({ url = '', title = 'A thought', date = '', description = 'Must be interesting', thumbnail = 'hero.jpg' }: PropsWithoutRef<PostProps>) => {

  return (
      <Link to={url} className={styles.post}>
        <PreviewCompatibleImage imageClass={styles.postImage} imageInfo={{image: thumbnail}} />
        <div className={styles.postContent}>
          <div className={`${styles.postContentTitle} title`}>
            {title}
          </div>
          <div className={styles.postContentDescription}>
            {description}
          </div>
        </div>
      </Link>
  );
};

export default Post;
