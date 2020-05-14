import React from 'react';
import PropTypes from 'prop-types';
import {IndexPageTemplate} from '../../templates/index-page';

const IndexPagePreview = ({entry, getAsset}: IndexPagePreviewProps) => {
    const data = entry.getIn(['data']).toJS();

    if (data) {
        return (
            <IndexPageTemplate
                image={getAsset(data.image)}
                title={data.title}
                heading={data.heading}
                subheading={data.subheading}
                description={data.description}
                intro={data.intro || {blurbs: []}}
                mainpitch={data.mainpitch || {}}
            />
        );
    } else {
        return <div>Loading...</div>;
    }
};

interface IndexPagePreviewProps {
    entry: {
        getIn: (data: string[]) => any;
    };
    getAsset: (data: string[]) => any;
}

export default IndexPagePreview;
