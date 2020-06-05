import React from 'react';
import {graphql, Link} from 'gatsby';
import _ from 'lodash';

import Layout from '../components/containers/layout/Layout';
import {Image} from '../models/Image';
import Intro from '../components/components/intro/intro';
import SEO from '../components/containers/seo/seo';
import Mission from '../components/components/mission/mission';
import Posts from '../components/components/posts/posts';
import Book from '../components/components/book/book';

export const IndexPageTemplate = ({
                                      image,
                                      title,
                                      heading,
                                      subheading,
                                      mainpitch,
                                      mission,
                                      featuredPost,
                                      posts
                                  }: IndexPageTemplateProps) => {

    const accumulator: { images: (Image | string)[]; values: string[] } = {images: [], values: []};
    const {values, images} = (mission.values || []).reduce(({images, values}, current) => ({
        images: [...images, current.image],
        values: [...values, current.text]
    }), accumulator);

    let tags: string[] = posts.reduce((accTags: string[], post) => [...accTags, ...post.node.frontmatter.tags], []);
    tags = _.uniq(tags);
    return (
        <>
            <SEO title={title}/>
            <Intro heading={mainpitch.title}
                   author={mainpitch.author}>
                <p>{mainpitch.description}</p>
            </Intro>
            <Mission side={mission.side}
                     mission={mission.heading}
                     values={values} images={images}/>
            <Intro
                heading={featuredPost.frontmatter.title}
                author={mainpitch.author}
                imageFluid={(featuredPost.frontmatter.featuredimage as Image).childImageSharp.fluid}
            >
                <p>
                    {featuredPost.frontmatter.description}
                </p>
               <Link style={{fontWeight: 600}} to={featuredPost.fields.slug}>READ MORE</Link>
            </Intro>
            <Posts side={'- Posts'} heading={'Thoughts & Posts'} posts={posts} categories={tags}/>
            {/*<Book heading="Of Who Was Me. Many. In Middle."/>*/}
        </>
    );
};

interface IndexPageTemplateProps {
    image: Image | string;
    title: string;
    heading: string;
    subheading: string;
    mainpitch: MainPitch;
    mission: {
        side: string;
        heading: string;
        values: { image: Image | string; text: string }[];
    };
    featuredPost: {
        id: string;
        html: string;
        fields: {
            slug: string
        }
        frontmatter: {
            date: string;
            title: string;
            featuredimage: Image | string;
            description: string;
            tags: string[];
        }
    }
    posts: {
        node: {
            id: string;
            html: string;
            fields: {
                slug: string
            }
            frontmatter: {
                date: string;
                title: string;
                featuredimage: Image | string;
                description: string;
                tags: string[];
            }
        }
    }[]
}

const IndexPage = ({data}: IndexPageProps) => {
    const posts = data.allMarkdownRemark.edges;
    const {node: featuredPost} = posts[0];
    const {frontmatter} = data.markdownRemark;

    return (
        <Layout isLandingPage={true} image={frontmatter.image}>
            <IndexPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                subheading={frontmatter.subheading}
                mainpitch={frontmatter.mainpitch}
                mission={frontmatter.mission}
                featuredPost={featuredPost}
                posts={posts}
            />
        </Layout>
    );
};

interface IndexPageProps {
    data: {
        allMarkdownRemark: {
            edges: {
                node: {
                    id: string;
                    html: string;
                    fields: {
                        slug: string;
                    }
                    frontmatter: {
                        date: string;
                        title: string;
                        featuredimage: Image | string;
                        description: string;
                        tags: string[];
                    }
                }
            }[];
        };
        markdownRemark: {
            frontmatter: {
                title: string;
                image: Image;
                heading: string;
                subheading: string;
                mainpitch: MainPitch;
                description: string;
                mission: {
                    values: { image: Image | string; text: string }[];
                    side: string;
                    heading: string;
                }
            },
        }
    };
}

interface MainPitch {
    title: string;
    description: string;
    author: {
        name: string;
        title: string;
        image: Image;
    }
}

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___featuredpost}, filter: {frontmatter: {featuredpost: {}, templateKey: {eq: "blog-post"}}}) {
        edges {
          node {
            id
            fields {
                slug
            }
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
      }
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        mainpitch {
          title
          description
          author {
            name
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
        mission {
          side
          heading
          values {
            text
            image {
              childImageSharp {
                fluid(maxWidth: 2048, quality: 80) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;
