import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../../actions/auth';
import './ResetPassword.css';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [formData, setFormData] = useState({
        email: ''
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        const res = await reset_password(email);
        if(res.isSuccess == true){
            setRequestSent(true);
        }else{
            setRequestSent(false);
        }
    };

    if (requestSent) {
        return <Redirect to='/' />
    }

    return (
        <div className='container wkd-reset-pass-height'>
            <div
                className='d-flex flex-column justify-content-center align-items-center'>

                <h1>Lupa Kata Sandi</h1>
                <p>Tulis alamat email akun anda, kami akan mengirimkan anda email konfirmasi untuk mengatur ulang kata sandi.</p>
                <form onSubmit={e => onSubmit(e)} className='wkd-reset-pass-banner-card '>
                    <div className='form-group wkd-reset-pass-input'>
                        <label htmlFor='email'>Email</label>
                        <input
                            id='email'
                            className='form-control'
                            type='email'
                            placeholder='Tuliskan alamat email...'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <button type='submit'
                        className='wkd-nav-button wkd-dark-green-button wkd-reset-pass-btn-reset'>
                        Kirim
                </button>
                </form>
                {requestSent?<p>Email perubahan password berhasil dikirim</p>:<p></p>}
            </div>
        </div>
    );
};

export default connect(null, { reset_password })(ResetPassword);
