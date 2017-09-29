import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { types } from './constants';

/**
 * @class MarkerLayout
 */
class MarkerLayout extends Component {
    static propTypes = {
        marker: PropTypes.object
    }

    componentWillUnmount () {
        if (this._marker) {
            this._marker.destroy();
        }
    }

    render () {
        return <div>{this.props.children}</div>;
    }
}

export default MarkerLayout;
