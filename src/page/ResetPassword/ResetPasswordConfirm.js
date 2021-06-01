import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm as confirmAction } from '../../actions/auth';
import './ResetPasswordConfirm.css';

const ResetPasswordConfirm = ({ match, reset_password_confirm }) => {
    const [requestSent, setRequestSent] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (new_password === re_new_password) {
            const uid = match.params.uid;
            const token = match.params.token;

            const res = await reset_password_confirm(uid, token, new_password, re_new_password);
            if (res.isSuccess) {
                setIsSuccess(true)
                setRequestSent(true);

                console.log("setIsSuccess(true)")
                console.log(setIsSuccess)

                alert('Password berhasil diubah')
            }
            else {
                setIsSuccess(false)
                setRequestSent(true);

                console.log("setIsSuccess(false)")
                console.log(setIsSuccess)

                alert('Terjadi kesalahan, harap coba kembali')
            }
        } else {
            alert("Password anda harus sama")
        }
    };

    if (requestSent) {
        console.log("isSuccess")
        console.log(isSuccess)

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
                        />
                    </div>
                    <button className='wkd-nav-button wkd-dark-green-button wkd-reset-pass-btn-reset' type='submit'>
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default connect(null, { reset_password_confirm: confirmAction })(ResetPasswordConfirm);
