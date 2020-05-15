import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import {ChildImageSharp, Image, PreviewImage} from '../models/Image';

const PreviewCompatibleImage = ({imageInfo, imageClass}: PreviewCompatibleImageProps) => {
    const {alt = '', childImageSharp, image} = imageInfo;

    if (!!image && !!(image as Image).childImageSharp) {
        return (
            <Img className={imageClass} fluid={(image as Image).childImageSharp.fluid} alt={alt}/>
        );
    }

    if (!!childImageSharp) {
        return <Img className={imageClass} fluid={childImageSharp.fluid} alt={alt}/>;
    }

    if (!!image && typeof image === 'string')
        return <img className={imageClass} src={image} alt={alt}/>;

    return null;
};

interface PreviewCompatibleImageProps {
    imageInfo: PreviewImage;
    imageClass?: any;
}

export default PreviewCompatibleImage;
