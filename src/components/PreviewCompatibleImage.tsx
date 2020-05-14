import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import {ChildImageSharp, Image, PreviewImage} from '../models/Image';

const PreviewCompatibleImage = ({imageInfo}: PreviewCompatibleImageProps) => {
    const imageStyle = {borderRadius: '5px'};
    const {alt = '', childImageSharp, image} = imageInfo;

    if (!!image && !!(image as Image).childImageSharp) {
        return (
            <Img style={imageStyle} fluid={(image as Image).childImageSharp.fluid} alt={alt}/>
        );
    }

    if (!!childImageSharp) {
        return <Img style={imageStyle} fluid={childImageSharp.fluid} alt={alt}/>;
    }

    if (!!image && typeof image === 'string')
        return <img style={imageStyle} src={image} alt={alt}/>;

    return null;
};

interface PreviewCompatibleImageProps {
    imageInfo: PreviewImage;
}

export default PreviewCompatibleImage;
