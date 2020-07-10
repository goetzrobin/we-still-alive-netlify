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

const MAX_TITLE_LENGTH = 70;
const MAX_DESC_LENGTH = 310;

const Post = ({ url = '', title = 'A thought', date = '', description = 'Must be interesting', thumbnail = 'hero.jpg' }: PropsWithoutRef<PostProps>) => {
    const previewTitle = title.substr(0, MAX_TITLE_LENGTH) + (title.length > MAX_TITLE_LENGTH ? '...' : '');
    const previewDescription = description.substr(0, MAX_DESC_LENGTH) + (description.length > MAX_DESC_LENGTH ? '...' : '');
  return (
      <Link to={url} className={styles.post}>
        <PreviewCompatibleImage imageClass={styles.postImage} imageInfo={{image: thumbnail}} />
        <div className={styles.postContent}>
          <div className={`${styles.postContentTitle} title`}>
            {previewTitle}
          </div>
          <div className={styles.postContentDescription}>
            {previewDescription}
          </div>
        </div>
      </Link>
  );
};

export default Post;
