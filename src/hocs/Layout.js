import React, { useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { googleAuthenticate, load_user } from '../actions/auth';
import queryString from 'query-string';

const Layout = ({googleAuthenticate, children }) => {
    let location = useLocation();

    useEffect(() => {
        const values = queryString.parse(location.search);
        const state = values.state ? values.state : null;
        const code = values.code ? values.code : null;

        console.log('State: ' + state);
        console.log('Code: ' + code);

        if (state && code) {
            googleAuthenticate(state, code);
        } else {  
            load_user();
        }
    }, [location]); 
    
    return (
        <div id="layout">
            {children}
        </div>
    );
};


export default connect(null, { googleAuthenticate, load_user })(Layout);