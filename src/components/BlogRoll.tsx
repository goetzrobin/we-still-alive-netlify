import React from 'react';
import {Link, graphql, StaticQuery} from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';
import {Image} from '../models/Image';
import Posts from './components/posts/posts';
import _ from 'lodash';

class BlogRoll extends React.Component<BlogRollProps> {
    render() {
        const {data} = this.props;
        const {edges: posts} = data.allMarkdownRemark;
        let tags: string[] = posts.reduce((accTags: string[], post) => [...accTags, ...post.node.frontmatter.tags], []);
        tags = _.uniq(tags);

        return (
            <>
                <Posts side={'Posts'} heading={'The Blog'} posts={posts} categories={tags}/>
            </>
        );
    }
}

interface BlogRollProps {
    data: BlogRollData;
    count: number;
}

interface BlogRollData {
    allMarkdownRemark: {
        edges: BlogRollNode[];
    };
}

interface BlogRollNode {
    node: {
        excerpt: string
        id: string;
        fields: {
            slug: string
        }
        frontmatter: {
            title: string
            templateKey: string;
            date: string;
            featuredpost: boolean;
            featuredimage: Image;
            tags: string[];
        }
    };
}

const renderMethod: any = (data: BlogRollData, count: number) => <BlogRoll data={data} count={count}/>;

export default () => (
    <StaticQuery
        query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                tags
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 1000, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
        render={renderMethod}
    />
);
