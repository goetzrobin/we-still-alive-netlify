import React from 'react';
import PropTypes from 'prop-types';
import {kebabCase} from 'lodash';
import {Helmet} from 'react-helmet';
import {graphql, Link} from 'gatsby';
import Layout from '../components/Layout';
import Content, {HTMLContent} from '../components/Content';

export const BlogPostTemplate = ({
                                     content,
                                     contentComponent,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                 }: BlogPostTemplateProps) => {
    const PostContent: any = contentComponent || Content;

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                            {title}
                        </h1>
                        <p>{description}</p>
                        <PostContent content={content}/>
                        {tags && tags.length ? (
                            <div style={{marginTop: `4rem`}}>
                                <h4>Tags</h4>
                                <ul className="taglist">
                                    {tags.map(tag => (
                                        <li key={tag + `tag`}>
                                            <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
};

interface BlogPostTemplateProps {
    content: any;
    contentComponent?: (data: any) => any;
    description: string;
    title: string;
    helmet?: any;
    tags: string[];
}

const BlogPost = ({data}: BlogPostProps) => {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <BlogPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                helmet={
                    <Helmet titleTemplate="%s | Blog">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    );
};

interface BlogPostProps {
    data: {
        markdownRemark: {
            id: string;
            html: string;
            frontmatter: {
                date: string;
                title: string;
                description: string;
                tags: string[];
            }
        }
    };
}

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`;
