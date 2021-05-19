import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../../actions/auth';

const Aktivasi = ({ verify, match }) => {
    const [verified, setVerified] = useState(false);

    const verify_account = e => {
        const uid = match.params.uid;
        const token = match.params.token;

        verify(uid, token);
        setVerified(true);
    };

    if (verified) {
        return <Redirect to='/' />
    }

    return (
        <div className='container'>
            <div 
                className='d-flex flex-column justify-content-center align-items-center'
                style={{ 
                    marginTop: '20%' ,
                    marginBottom: '20%'
                }}
            >
                <h1>Verifikasi akun anda</h1>
                <button
                    onClick={verify_account}
                    type='button'                
                    style={{ marginTop: '1.4%' }}
                    class='wkd-nav-button wkd-dark-green-button'
                >
                    Verifikasi
                </button>
            </div>
        </div>
    );
};

export default connect(null, { verify })(Aktivasi);