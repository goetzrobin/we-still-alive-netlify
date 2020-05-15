import React, { PropsWithoutRef, useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img, { FluidObject } from 'gatsby-image';


interface ImageProps {
  src: string;
}

const HeroImage = () => {
  const data = useStaticQuery(graphql`
  query {
    file(relativePath: { eq: "hero.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 3080, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `);

  return <Img fluid={data.file.childImageSharp.fluid} Tag="div"/>;
};

export default HeroImage;
