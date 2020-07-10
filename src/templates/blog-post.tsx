import React from 'react';
import PropTypes from 'prop-types';
import {kebabCase} from 'lodash';
import {Helmet} from 'react-helmet';
import {graphql, Link} from 'gatsby';
import Layout from '../components/containers/layout/Layout';
import Content, {HTMLContent} from '../components/Content';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import {Image} from '../models/Image';

export const BlogPostTemplate = ({
                                     content,
                                     contentComponent,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                     image,
                                 }: BlogPostTemplateProps) => {
    const PostContent: any = contentComponent || Content;

    return (
        <section className="section">
            {helmet || ''}
            <div className="container content">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <h1>
                            {title}
                        </h1>
                        <p className="blog-desc">{description}</p>
                        <div style={{marginBottom: 30, width: '100%', maxHeight: 600, overflow: 'hidden'}}>
                            <PreviewCompatibleImage imageInfo={{childImageSharp: image.childImageSharp}}/>
                        </div>
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
    image: Image;
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
                image={post.frontmatter.featuredimage}
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
                featuredimage: Image;
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
        featuredimage {
            childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
            }
        }
      }
    }
  }
`;
