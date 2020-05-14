import React from 'react';
import {BlogPostTemplate} from '../../templates/blog-post';

const BlogPostPreview = ({entry, widgetFor}: BlogPostPreviewProps) => {
    const tags = entry.getIn(['data', 'tags']);
    return (
        <BlogPostTemplate
            content={widgetFor('body')}
            description={entry.getIn(['data', 'description'])}
            tags={tags && tags.toJS()}
            title={entry.getIn(['data', 'title'])}
        />
    );
};

interface BlogPostPreviewProps {
    entry: {
        getIn: (data: string[]) => any;
    };
    widgetFor: (data: string) => any;
}

export default BlogPostPreview;
