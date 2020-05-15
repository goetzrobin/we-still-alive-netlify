import React from 'react';

import Layout from '../../components/containers/layout/Layout';
import BlogRoll from '../../components/BlogRoll';

export default class BlogIndexPage extends React.Component {
    render() {
        return (
            <Layout>
                <BlogRoll/>
            </Layout>
        );
    }
}
