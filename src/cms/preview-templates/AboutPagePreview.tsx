import React from 'react';
import {AboutPageTemplate} from '../../templates/about-page';

const AboutPagePreview = ({entry, widgetFor}: AboutPagePreviewProps) => (
    <AboutPageTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
);

interface AboutPagePreviewProps {
    entry: {
        getIn: (data: string[]) => any;
    };
    widgetFor: (key: string) => any;
}

export default AboutPagePreview;
