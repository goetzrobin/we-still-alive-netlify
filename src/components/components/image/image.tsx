import React, { PropsWithoutRef, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';


interface ImageProps {
  src: string;
  [key: string]: any;
}

const Image = ({ src, ...props }: ImageProps) => {
  const data = useStaticQuery(graphql`
    query {
      allFile( filter: { internal: { mediaType: { regex: "/image/" } } } ) {
        nodes {
          relativePath
          childImageSharp {
            fluid(maxWidth: 1000, quality: 85) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  `);

  const match = useMemo(() => (
    data.allFile.nodes.find(({ relativePath }: { relativePath: string }) => src === relativePath)
  ), [data, src]);

  const fluid = match && match.childImageSharp ? match.childImageSharp.fluid : null;

  return fluid ? (
    <Img
      fluid={fluid}
      Tag="div"
      {...props}
    />
  ) : null;
};

export default Image;
