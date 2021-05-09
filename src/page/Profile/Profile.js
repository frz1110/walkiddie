import './Profile.css';
import defaultIcon from './user.svg';
import editIcon from './pictures.svg';
import { ChevronLeft } from 'react-feather';
import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { load_user, post_profile, update_profile, load_profile } from '../../actions/auth';
import { Link, Redirect } from 'react-router-dom';
import loadingIcon from '../../media/loading-icon.jpg';

const Profile = ({ load_user, isAuthenticated }) => {
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [email, setEmail] = useState('');
    const [isFilled, setIsFilled] = useState(false);
    const [imageChanged, setImageChaged] = useState(false);
    const [preview, setPreview] = useState()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        phone_number: '',
        ktp_number: '',
        birth_date:'',
        profile_picture: null
    });

    const imageUploader = React.useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await load_user();
                console.log(result.res.data)
                setLoading(false);
                setData(result.res.data);
                setEmail(result.res.data.email);
            }
            catch (err) {

            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await load_profile()(email);
                console.log(result.res.data)
                setProfile(result.res.data);
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
            setFormData({
                address: profile.address,
                phone_number: profile.phone_number,
                ktp_number: profile.ktp_number,
                birth_date: profile.birth_date,
            });
        }
        setInitial();
    }, [profile]);
    
    const handleSubmit = async e => {
        e.preventDefault();

        if(!isFilled){
            const res = await post_profile(email, full_name, address, phone_number, ktp_number, birth_date, profile_picture);
            if (res.success){
                window.location.reload(false);
            } else {
                alert('Terjadi kesalahan, pastikan Anda mengisi semua data (termasuk foto profil)')
            }
        } else {
            const res = await update_profile(email, full_name, address, phone_number, ktp_number, birth_date, profile_picture, imageChanged);
            if (res.success){
                window.location.reload(false);
            } else {
                alert('Terjadi kesalahan, data anda gagal diubah')
            }
        }
    };

    const onFileChange = event => {
        setFormData({ ...formData, profile_picture: event.target.files[0] });
        setImageChaged(true);
    };

    const { address, phone_number, ktp_number, birth_date, profile_picture } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    useEffect(() => {
        if (!profile_picture) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(profile_picture)
        setPreview(objectUrl)

    }, [profile_picture])

    const full_name = data.first_name + " " + data.last_name;

    if (!isAuthenticated) {
        return <Redirect to='/masuk' />
    }

    return ( 
        <div className="profile-form">
            <form className="centered" onSubmit={handleSubmit}>
                <h3 className="profile-header"><ChevronLeft size="40" className="chevron-left"/>Ubah Profil</h3>
                <Row className="justify-content-center">
                    <div className="col-lg-3">
                        <div className="square-box-1">
                            <div className="default-icon">
                                {!profile_picture && !isFilled && <img className="profile-icon" src={defaultIcon} alt=""></img>}
                                {!profile_picture && profile.profile_picture && <img className="profile-icon" src={profile.profile_picture} alt=""></img>}
                                {profile_picture && <img className="profile-icon" src={preview} alt=""></img>}
                                <div onClick={() => imageUploader.current.click()} className="edit-wrapper">
                                    <img src={editIcon} alt="change icon"></img>
                                </div>
                            </div>
                            <h4 className="name-display">{data.first_name}</h4>
                            <p className="email-display">{data.email}</p>
                            <p className="midtext"></p>
                        </div>
                        <Row className="button-wrapper">
                            <div className="col">
                                <Link to="/"><button className="cancel-button" type="button"> 
                                    Batalkan
                                </button></Link>
                            </div>
                            <div className="col">
                                <button className="save-button submit-button" type="submit"> 
                                    Simpan
                                </button>
                            </div>
                        </Row>
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
                                <div className="form-container centered">
                                    <label htmlFor='full_name'> Nama Lengkap </label>
                                    <br></br>
                                    <input
                                        id='full_name'
                                        type='text'
                                        name='full_name'
                                        value= {full_name}
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
                                    <label htmlFor='email'> Email </label>
                                    <br></br>
                                    <input
                                        id='email'
                                        type='email'
                                        name='email'
                                        value={data.email}
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
                                <div className="form-container centered">
                                    <label htmlFor='password'> Kata Sandi </label>
                                    <br></br>
                                    <input
                                        id='password'
                                        type='password'
                                        name='password'
                                        value='useruser123'
                                        disabled
                                    />
                                </div>
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
                                <div className="form-container"></div>
                                    <Link to="/reset-password"><button className="password-button" type="button">
                                    Lupa Kata Sandi
                                    </button></Link>
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
                                <div className="form-container" style={{display: "none"}}>
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

export default connect(mapStateToProps, { load_user })(Profile);
