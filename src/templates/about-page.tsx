import React from 'react';
import {graphql} from 'gatsby';
import Layout from '../components/containers/layout/Layout';
import Content, {HTMLContent} from '../components/Content';
import {Image} from '../models/Image';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const AboutPageTemplate = ({title, content, image, contentComponent}: AboutPageTemplateProps) => {
    const PageContent: any = contentComponent || Content;
    const imageInfo = {image};
    return (
        <section className="section section--gradient">
            <div className="container">
                <div className="columns">
                    <div className="column is-10 is-offset-1">
                        <div className="author-image"><PreviewCompatibleImage imageInfo={imageInfo}/></div>
                        <div className="section">
                            <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                                {title}
                            </h2>
                            <PageContent className="content" content={content}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

interface AboutPageTemplateProps {
    title: string;
    image: Image;
    content: string;
    contentComponent?: (data: any) => any;
}

const AboutPage = ({data}: AboutPageProps) => {
    const {markdownRemark: post} = data;

    return (
        <Layout>
            <AboutPageTemplate
                contentComponent={HTMLContent}
                image={post.frontmatter.image}
                title={post.frontmatter.title}
                content={post.html}
            />
        </Layout>
    );
};

interface AboutPageProps {
    data: {
        markdownRemark: {
            html: string;
            frontmatter: {
                title: string;
                image: Image;
            };
        }
    };
}

export default AboutPage;

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        title
        image {
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
