import React, {PropsWithoutRef, useEffect, useState} from 'react';
import * as styles from './posts.module.scss';
import Post from './post/post';

interface PostsProps {
  heading: string;
  posts: any[];
  categories: string[];
  postSize?: string;
  fullWidthFilters?: boolean;
}



const Posts = ({heading = '', posts = [], categories = ['Friendship'], postSize = 'small', fullWidthFilters = false }: PropsWithoutRef<PostsProps>) => {
  const [postsDisplayed, setPostsDisplayed] = useState(posts);
  const [categoriesDisplayed, setCategoriesDisplayed] = useState(categories);

  const handleCategory = (category: string) => {
    setCategoriesDisplayed(category === 'All' ? categories : [category]);
  };

  useEffect(() => {
  setPostsDisplayed(posts.filter(post => post.node.frontmatter.tags.some((tag: string) => categoriesDisplayed.some(displayed => displayed === tag))));
}, [categoriesDisplayed]);

  const postComponents = postsDisplayed.map((post, index) => {
    const { title, date, description, featuredimage } = post.node.frontmatter;
    return <Post postSize={postSize} key={index} url={post.node.fields.slug} title={title} date={date} description={description} thumbnail={featuredimage}/>;
  });

  return (
    <>
      <div className={`${styles.top} ${fullWidthFilters ? styles.fullWidthContainer : ''}`}>
        <div className={`${styles.topLeft} ${fullWidthFilters ? styles.fullWidth : ''}`}>
          <h1>{heading}</h1>
        </div>
        <div className={`${styles.topRight} ${fullWidthFilters ? styles.fullWidth : ''}`}>
          <ul className={styles.categories}>
            <div  className={`label ${styles.categoriesItem}`} key={-1}><span onClick={() => handleCategory('All')} className={styles.categoriesItemLink}>All</span></div>
            {categories.map(category => <div  className={`label ${styles.categoriesItem}`} key={category}><span onClick={() => handleCategory(category)} className={styles.categoriesItemLink}>{category}</span></div>)}
          </ul>
        </div>
      </div>
      <div className={styles.posts}>
          {postComponents}
        </div>
    </>
  );
};

export default Posts;
