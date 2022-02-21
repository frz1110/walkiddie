import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../../actions/auth';
import loadingIcon from '../../media/loading-icon.jpg';
import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setLoading(true);

        if (new_password === re_new_password) {
            const uid = match.params.uid;
            const token = match.params.token;
            const res = await reset_password_confirm(uid, token, new_password, re_new_password);
            if (res.isSuccess) {
                setIsSuccess(true)
                setRequestSent(true);
                setLoading(false);
                alert('Password berhasil diubah')
            }
            else {
                setIsSuccess(false)
                setRequestSent(true);
                setLoading(false);
                alert(res.error.response.data[Object.keys(res.error.response.data)[0]] + " Please repeat reset password process.")
            }
        } else {
            setLoading(false);
            alert("Password anda harus sama")
        }
    };

    if (requestSent) {
        if (isSuccess) {
            return <Redirect to='/masuk' />
        } else {
            return <Redirect to='/reset-password' />
        }
    }

    return (
        <div className='container wkd-reset-pass-height'>
            <div
                className='d-flex flex-column justify-content-center align-items-center'>
                <h1>Setel Ulang Kata Sandi</h1>
                <p>Tulis kata sandi anda yang baru.</p>
                <form onSubmit={e => onSubmit(e)} className='wkd-reset-pass-banner-card'>
                    <div className='form-group wkd-reset-pass-input'>
                        <label htmlFor='new_password'>Tuliskan kata sandi baru</label>
                        <input
                            id='new_password'
                            className='form-control'
                            type='password'
                            placeholder='Kata sandi baru'
                            name='new_password'
                            value={new_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                            disabled={loading}
                        />
                    </div>
                    <div className='form-group wkd-reset-pass-input'>
                        <label htmlFor='re_new_password'>Tuliskan ulang kata sandi baru</label>
                        <input
                            id='re_new_password'
                            className='form-control'
                            type='password'
                            placeholder='Konfirmasi kata sandi baru'
                            name='re_new_password'
                            value={re_new_password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                            disabled={loading}
                        />
                    </div>
                    <button className='wkd-nav-button wkd-dark-green-button wkd-reset-pass-btn-reset' disabled={loading} type='submit'>
                        Reset Password
                    </button>
                    {loading && <img src={loadingIcon} id="loading-icon" alt="loading..." />}
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);