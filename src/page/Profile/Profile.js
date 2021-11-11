import './Profile.css';
import defaultIcon from './user.svg';
import axios from 'axios';
import editIcon from './pictures.svg';
import { ChevronLeft } from 'react-feather';
import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { post_profile, update_profile, load_profile } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import loadingIcon from '../../media/loading-icon.jpg';

const Profile = ({ userData, isAuthenticated }) => {
    const [authData, setAuthData] = useState({
        email: '',
        first_name: '',
        last_name: '',
        role: ''
    });
    const [profile, setProfile] = useState([]);
    const [isFilled, setIsFilled] = useState(false);
    const [imageChanged, setImageChaged] = useState(false);
    const [preview, setPreview] = useState()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        phone_number: '',
        ktp_number: '',
        birth_date: '',
        profile_picture: null,
        income: "Rp"+0
    });

    const imageUploader = React.useRef(null);
    const { email, first_name, last_name, role } = authData;

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setAuthData({
                    email: userData.email,
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    role: userData.role
                });
                setLoading(true);
                const result = await load_profile()(email);
                setProfile(result.res.data);
                setLoading(false);
                setIsFilled(true);
            }
            catch (err) {
                setIsFilled(false);
            }
        }

        fetchData();
    }, [email]);

    useEffect(() => {
        const setInitial = async () => {
            const ringkasan_investasi = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/ringkasan-investor/`, config);
            var pendapatan_investasi = 0
            if (ringkasan_investasi.data.length>0) {
                for (let i = 0; i < ringkasan_investasi.data.length; i++) {
                    pendapatan_investasi += ringkasan_investasi.data[i].pendapatan;
                  }
            }
            setFormData({
                address: profile.address,
                phone_number: profile.phone_number,
                ktp_number: profile.ktp_number,
                birth_date: profile.birth_date,
                income: "Rp"+pendapatan_investasi
            });
        }
        setInitial();
    }, [profile]);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        if (!isFilled) {
            const res = await post_profile(email, full_name, address, phone_number, ktp_number, birth_date, profile_picture);
            if (res.success) {
                window.location.reload(false);
            } else {
                setLoading(false);
                alert('Terjadi kesalahan, pastikan Anda mengisi semua data (termasuk foto profil)')
            }
        } else {
            const res = await update_profile(email, full_name, address, phone_number, ktp_number, birth_date, profile_picture, imageChanged);
            if (res.success) {
                window.location.reload(false);
            } else {
                setLoading(false);
                alert('Terjadi kesalahan, data anda gagal diubah')
            }
        }
    };

    const onFileChange = event => {
        setFormData({ ...formData, profile_picture: event.target.files[0] });
        setImageChaged(true);
    };

    const { address, phone_number, ktp_number, birth_date, profile_picture, income } = formData;
    const full_name = first_name + " " + last_name;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (!profile_picture) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(profile_picture)
        setPreview(objectUrl)

    }, [profile_picture])

    if (!isAuthenticated) {
        return <Redirect to='/masuk' />
    }

    return (
        <div className="profile-form">
            <form className="profile-styling" onSubmit={handleSubmit}>
                <h3 className="profile-header" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Ubah Profil</h3>
                <Row className="justify-content-center">
                    <div className="col-lg-3">
                        <div className="square-box-1">
                            <div className="profile-default-icon">
                                {!profile_picture && !isFilled && <img className="profile-icon" src={defaultIcon} alt=""></img>}
                                {!profile_picture && profile.profile_picture && <img className="profile-icon" src={profile.profile_picture} alt=""></img>}
                                {profile_picture && <img className="profile-icon" src={preview} alt=""></img>}
                                <div onClick={() => imageUploader.current.click()} className="edit-wrapper">
                                    <img src={editIcon} alt="change icon"></img>
                                </div>
                            </div>
                            <h4 className="profile-name-display">{first_name}</h4>
                            <p className="profile-email-display">{email}</p>
                            <p className="profile-midtext"></p>
                        </div>
                        <div className="profile-button-wrapper">
                            <Link to="/"><button className="profile-cancel-button" type="button">
                                Batalkan
                            </button></Link>
                            <button className="profile-save-button submit-button" type="submit">
                                Simpan
                            </button>
                        </div>
                    </div>
                    {loading && <img src={loadingIcon} id="loading-icon" alt="loading..." />}
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
                                    <div className="profile-form-container">
                                        <label htmlFor='full_name'> Nama Lengkap </label>
                                        <br></br>
                                        <input
                                            id='full_name'
                                            type='text'
                                            name='full_name'
                                            value={full_name}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="profile-form-container">
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
                                    <div className="profile-form-container">
                                        <label htmlFor='email'> Email </label>
                                        <br></br>
                                        <input
                                            id='email'
                                            type='email'
                                            name='email'
                                            value={email}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="profile-form-container">
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
                                    <div className="profile-form-container">
                                        <label htmlFor='role'> Posisi </label>
                                        <br></br>
                                        <input
                                            id='role'
                                            type='text'
                                            name='role'
                                            value={role}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div className="profile-form-container">
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
                                    <div className="profile-form-container">
                                        <label htmlFor='income'> Pendapatan Investasi </label>
                                        <br></br>
                                        <input
                                            id='income'
                                            name='income'
                                            value={income}
                                            disabled
                                        />
                                    </div>
                                    <div className="profile-form-container"></div>
                                    <Link to="/reset-password"><button className="profile-password-button" type="button">
                                        Lupa Kata Sandi
                                    </button></Link>
                                </div>
                                <div className="col-sm">
                                    <div className="profile-form-container">
                                        <label htmlFor='address'> Alamat Lengkap </label>
                                        <br></br>
                                        <textarea
                                            id='address'
                                            name='address'
                                            value={address}
                                            onChange={e => onChange(e)}
                                            required
                                            rows="8"
                                            max-rows="10"
                                        />
                                    </div>
                                </div>
                            </Row>
                            <Row className="justify-content-center">
                                <div className="col-sm">

                                </div>
                                <div className="col-sm">
                                    <div className="profile-form-container" style={{ display: "none" }}>
                                        <label htmlFor='profile_picture'> Foto Profil </label>
                                        <input type="file" id='profile_picture' accept="image/*" ref={imageUploader} onChange={onFileChange} />
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

const mapStateToProps = state => ({
    userData: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Profile);
