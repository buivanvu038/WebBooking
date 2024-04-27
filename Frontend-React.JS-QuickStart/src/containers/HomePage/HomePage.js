import { divide } from 'lodash';
import React, { Component } from 'react';
import Header from './HomeHeader';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';

class HomePage extends Component {

    render() {

        return (
           <div><HomeHeader/></div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
