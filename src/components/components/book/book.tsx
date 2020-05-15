import React from 'react';
import * as styles from './book.module.scss';
import BookForm from '../../forms/book-form/book-form';
import Image from '../image/image';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';

interface BookProps {
  side?: string;
  heading: string;
}

const Book = ({ side = '- The Book', heading = '' }: BookProps) => {

  const handleBookForm = () => (form: { email: string }) => console.log(form.email);
  return (
    <div className={styles.bookContainer}>
      <div className="label">{side}</div>
      <div className={styles.book}>
        <div className={styles.bookCover}><PreviewCompatibleImage imageInfo={{image: "img/book.png"}}/></div>
        <div className={styles.bookDescription}>
          <h1>{heading}</h1>
          <div className={styles.placeholder}></div>
          <p className="title">by Michelle Ganz</p>
          <p>To get the manuscript enter your email here:</p>
          <BookForm onSubmit={handleBookForm()}/>
        </div>
      </div>
    </div>
  );
};

export default Book;
