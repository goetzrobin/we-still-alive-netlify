import React, { PropsWithoutRef, useEffect, useState } from 'react';
import * as styles from './mission.module.scss';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/all';
import Img from 'gatsby-image';
import { MissionHelper } from './mission.helper';

interface MissionProps {
  side: string;
  mission: string;
  values: string[];
  images: any[];
}

function buildImage(picture: any, index: number, dimensions: { width: number; height: number; margin: number }, pictureShowing: number) {
  const fluid = picture && picture.childImageSharp ? picture.childImageSharp.fluid : null;
  return fluid && (
    <div
      key={index}
      style={{ width: dimensions.width, height: dimensions.height, margin: `0 ${dimensions.margin}px` }}
      className={`${styles.picture} ${(pictureShowing === index) ? styles.active : ''}`}
    >
      <Img fluid={fluid} Tag="div"/>
    </div>
  );
}

const Mission = ({ side = '', mission = '', values = [], images = [] }: PropsWithoutRef<MissionProps>) => {
  const [pictureShowing, movePicture] = useState(0);
  const [windowWidth, updateWindowWidth] = useState(0);

  const moveToNext = () => movePicture(Math.min(pictureShowing + 1, pictureComponents.length - 1));
  const moveToBefore = () => movePicture(Math.max(pictureShowing - 1, 0));

  const dimensions = MissionHelper.generatePictureHeightWidthAndMargins(windowWidth, { width: 1238, height: 825 });

  const offset = pictureShowing * -1 * (dimensions.width + dimensions.margin * 2);

  const pictureComponents = images.map((picture, index) => buildImage(picture, index, dimensions, pictureShowing));
  const valueComponents = values
      .map((value, index) =>
          <li key={index} className={`label ${styles.valuesListItem} ${(pictureShowing === index) ? styles.active : ''}`}>
            {value}
          </li>
      );

  useEffect(() => {
    const handleResize = () => updateWindowWidth((window.innerWidth));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <>
      <div className={styles.missionContainer}>
        <div className={styles.mission}>
          <h1>{side}</h1>
          <p>{mission}</p>
        </div>
        <div className={styles.values}>
          <ul className={styles.valuesList}>
            {valueComponents}
          </ul>
        </div>
      </div>
      <div className={styles.pictures}>
        <figure style={{ left: offset }}>
          {pictureComponents}
        </figure>
      </div>
      <div className={styles.controls}>
        <button className={`${styles.controlsButton} ${pictureShowing === 0 ? styles.disabled : ''}`}
                onClick={moveToBefore}><MdKeyboardArrowLeft/></button>
        <button
          className={`${styles.controlsButton} ${pictureShowing === pictureComponents.length - 1 ? styles.disabled : ''}`}
          onClick={moveToNext}><MdKeyboardArrowRight/></button>
      </div>
    </>
  );
};

export default Mission;
