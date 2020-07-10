import React, {PropsWithoutRef, useState} from 'react';
import * as styles from './donations.module.scss';
import {Image} from '../../../models/Image';
import PreviewCompatibleImage from '../../PreviewCompatibleImage';
import {HTMLContent} from '../../Content';

interface DonationsProps {
    heading: string;
    intro: string;
    charities: {
        url: string
        name: string;
        description: string;
        image: string | Image;
    }[];
}

const Donations = ({heading = '', intro = '', charities = []}: PropsWithoutRef<DonationsProps>) => {
    const [currentSelection, setCurrentSelection] = useState(charities[0]);
    return (
        <>
            <div className={styles.donationsContainer}>
                <h1>{heading}</h1>
                <p>{intro}</p>
                <div className={styles.donations}>
                    <div className={styles.donationsSelectionCurrent}>
                        <h2>{currentSelection.name}</h2>
                        <div>
                            <PreviewCompatibleImage imageClass={styles.selectionImage} imageInfo={{image: currentSelection.image}}/>
                            <HTMLContent className="" content={currentSelection.description}/>
                        </div>
                      <a href={currentSelection.url} target="_blank"><button className={`btn ${styles.selectionButton}`}>Donate Now</button></a>
                      <div className="clearfix"/>
                    </div>
                    <div className={styles.donationsSelection}>
                        {charities.map((charity, index) =>
                            <div key={index} className={styles.selection}
                                 onClick={() => {
                                     setCurrentSelection(charities[index]);
                                 }}>
                              <div  className={styles.selectionContent}>
                                <PreviewCompatibleImage imageInfo={{image: charity.image}}/>
                                <h4 className={styles.selectionName}>{charity.name}</h4>
                              </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Donations;
