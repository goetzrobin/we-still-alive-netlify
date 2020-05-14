import React from 'react';

export const HTMLContent = ({content, className}: ContentProps) => (
    <div className={className} dangerouslySetInnerHTML={{__html: content}}/>
);

const Content = ({content, className}: ContentProps) => (
    <div className={className}>{content}</div>
);

interface ContentProps  {
    content: any;
    className: string;
}


export default Content;
