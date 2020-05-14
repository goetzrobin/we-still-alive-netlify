import {FluidObject} from 'gatsby-image';

export interface Image {
    childImageSharp: ChildImageSharp;
}

export interface ChildImageSharp {
    fluid: FluidObject;
}

export interface PreviewImage {
    alt?: string;
    childImageSharp?: ChildImageSharp;
    image?: Image | string;
    style?: any;
}
