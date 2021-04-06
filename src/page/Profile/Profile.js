import './Profile.css';
import DefaultIcon from './default-profile.svg';
import EditIcon from './pictures.svg';
import { ChevronLeft } from 'react-feather';
import React, { useState } from 'react';
import { Row } from "react-bootstrap";

const Profile = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        full_name: '',
        address: '',
        phone_number: '',
        ktp_number: '',
        birth_date:''
    });

    const { username, email, password, full_name, address, phone_number, ktp_number, birth_date } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    return ( 
        <div className="profile-form">
            <form className="centered">
                <h3 className="profile-header"><ChevronLeft size="40" className="chevron-left"/>Ubah Profile</h3>
                <Row className="justify-content-center">
                    <div className="col-lg-3">
                        <div className="square-box-1">
                            <div className="default-icon">
                                <img className="profile-icon" src={DefaultIcon} alt=""></img>
                                <div className="edit-wrapper">
                                    <img src={EditIcon} alt=""></img>
                                </div>
                            </div>
                            <h4 className="username-display">@username12345</h4>
                            <p className="email-display">user12345@gmail.com</p>
                            <p className="midtext"></p>
                        </div>
                        <Row className="justify-content-center button-wrapper">
                            <div className="col">
                                <button className="cancel-button"> 
                                    Batalkan
                                </button>
                            </div>
                            <div className="col">
                                <button className="save-button submit-button" type="submit"> 
                                    Simpan
                                </button>
                            </div>
                        </Row>
                    </div>
                    <div className="col-lg-9">
                        <div className="square-box-2">
                            <Row className="justify-content-center">
                                <div className="col-sm data-type">
                                    <h3>Data Akun</h3>
                                </div>
                                <div className="col-sm data-type">                       
                                    <h3>Data Pribadi</h3>
                                </div>
                            </Row>
                            <Row className="justify-content-center">
                                <div className="col-sm">
                                    <div className="form-container centered">
                                        <label htmlFor='username'> Username </label>
                                        <br></br>
                                        <input
                                            id='username'
                                            type='text'
                                            // placeholder='Tuliskan Nama Depan'
                                            name='username'
                                            value='username12345'
                                            // onChange={e => onChange(e)}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="form-container centered">
                                        <label htmlFor='full_name'> Nama Lengkap </label>
                                        <br></br>
                                        <input
                                            id='full_name'
                                            type='text'
                                            name='full_name'
                                            value='User Anon'
                                            // onChange={e => onChange(e)}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </Row>
                            <Row className="justify-content-center">
                            <div className="col-sm">
                                <div className="form-container centered">
                                    <label htmlFor='email'> Email </label>
                                    <br></br>
                                    <input
                                        id='email'
                                        type='email'
                                        name='email'
                                        value='user12345@gmail.com'
                                        // onChange={e => onChange(e)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-container centered">
                                    <label htmlFor='phone_number'> Nomor Handphone </label>
                                    <br></br>
                                    <input
                                        id='phone_number'
                                        type='text'
                                        name='phone_number'
                                        value={phone_number}
                                        onChange={e => onChange(e)}
                                        pattern='[0-9]*'
                                        minLength='12'
                                        maxLength='12'
                                        required
                                    />
                                </div>
                            </div>
                            </Row>
                            <Row className="justify-content-center">
                            <div className="col-sm">
                                <div className="form-container centered">
                                    <label htmlFor='password'> Kata Sandi </label>
                                    <br></br>
                                    <input
                                        id='password'
                                        type='password'
                                        name='password'
                                        value='useruser123'
                                        // onChange={e => onChange(e)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-container centered">
                                <label htmlFor='ktp_number'> Nomor KTP </label>
                                    <br></br>
                                    <input
                                        id='ktp_number'
                                        type='text'
                                        name='ktp_number'
                                        value={ktp_number}
                                        onChange={e => onChange(e)}
                                        pattern='[0-9]*'
                                        minLength='16'
                                        maxLength='16'
                                        required
                                    />
                                </div>
                            </div>
                            </Row>
                            <Row className="justify-content-center">
                            <div className="col-sm">
                            <div className="form-container centered"></div>
                                <button className="password-button"> 
                                    Ubah Kata Sandi
                                </button>
                            </div>
                            <div className="col-sm">
                                <div className="form-container centered">
                                <label htmlFor='birth_date'> Tanggal Lahir </label>
                                    <br></br>
                                    <input
                                        id='birth_date'
                                        name='birth_date'
                                        value={birth_date}
                                        onChange={e => onChange(e)}
                                        required
                                        type="date"
                                    />
                                </div>
                            </div>
                            </Row>
                            <Row className="justify-content-center">
                            <div className="col-sm">
                                <div className="form-container centered">
                                </div>
                            </div>
                            <div className="col-sm">
                                <div className="form-container centered">
                                <label htmlFor='address'> Alamat Lengkap </label>
                                    <br></br>
                                    <textarea
                                        id='address'
                                        name='address'
                                        value={address}
                                        onChange={e => onChange(e)}
                                        required
                                        rows="5"
                                        max-rows="8"
                                    />
                                </div>
                            </div>
                            </Row>
                        </div>
                    </div>
                </Row>
            </form>
        </div>
    );
}
 
export default Profile;
