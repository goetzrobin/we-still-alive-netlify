import React from 'react';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import {Image} from '../models/Image';

const FeatureGrid = ({gridItems}: FeatureGridProps) => (
    <div className="columns is-multiline">
        {gridItems.map(item => (
            <div key={item.text} className="column is-6">
                <section className="section">
                    <div className="has-text-centered">
                        <div
                            style={{
                                width: '240px',
                                display: 'inline-block',
                            }}
                        >
                            <PreviewCompatibleImage imageInfo={item}/>
                        </div>
                    </div>
                    <p>{item.text}</p>
                </section>
            </div>
        ))}
    </div>
);

interface FeatureGridProps {
    gridItems: {
        image: Image | string;
        text: string;
    }[];
}

export default FeatureGrid;
