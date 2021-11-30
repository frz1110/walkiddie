import './LaporanKerusakan.css';
import axios from 'axios';
import { ChevronLeft } from 'react-feather';
import { Link, Redirect, useHistory  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';

const LaporanKerusakan = ({ isAuthenticated, userData, match}) => {

    const [formData, setFormData] = useState({
        kode: '',
        deskripsi: '',
        bukti: [],
    });

    const{kode} = formData
    let history = useHistory();

    useEffect(() => {
        try {
            setFormData({ ...formData, kode: match.params.pk });
        }
        catch (err) {           
        }
    });

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        postLaporan();
    }

    const postLaporan = () => {
        if (localStorage.getItem('access')) {
            var formDataToSend = new FormData();

            formDataToSend.append('mainan_pengadaan', formData['kode']);
            formDataToSend.append('deskripsi', formData['deskripsi']);

            for (let i = 0; i < formData['bukti'].length; i++) {
                formDataToSend.append('foto_kerusakan', formData['bukti'][i], formData['bukti'][i].name);
            }

            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/`, formDataToSend, config)
                .then((response) => {
                    console.log(response);
                    console.log('Success post');
                    window.history.back();
                    alert('Anda telah membuat laporan kerusakan');
                }, (error) => {
                    if (error.response) {

                        console.log("error.response")
                        console.log(error.response)

                    } else if (error.request) {

                        console.log("error.request")
                        console.log(error.request)

                    } else if (error.message) {

                        console.log("error.message")
                        console.log(error.message)

                    }
                    console.log(error);
                    alert("Terdapat kesalahan. Silakan mengecek kembali laporan yang Anda masukan dan refresh ulang halaman ini dan perbaiki pengadaan Anda.")
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    };

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleChangeFile = (event) => {
        setFormData({ ...formData, bukti: event.target.files });
    }

    if (!isAuthenticated) {
        return <Redirect to='/masuk' />
    }else if (userData.role != 'Mitra'){
        return (<Redirect to="/" />)
    }

    return (
        <div className="profile-form">
            <form className="profile-styling" onSubmit={handleSubmit}>
                <h3 className="profile-header" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Laporan Kerusakan Mesin</h3>
                <Row className="justify-content-center">
                    <div className="col-lg-9">
                        <div className="square-box-2">
                                <div className="col-sm">
                                <div className="profile-form-container">
                                    <label htmlFor='kode'> Kode Mainan </label>
                                    <br></br>
                                    <input
                                        id='kode'
                                        type='text'
                                        name='kode'
                                        value={kode}
                                        onChange={e => onChange(e)}
                                        disabled
                                    />
                                </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='deskripsi'> Deskripsi Kerusakan </label>
                                        <br></br>
                                        <textarea
                                            id='deskripsi'
                                            type='text'
                                            name='deskripsi'
                                            required
                                            onChange={e => onChange(e)}
                                            rows="8"
                                            max-rows="10"
                                        />
                                    </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='bukti'> Bukti Kerusakan </label>
                                        <div className="col-sm-9">
                                        <input
                                            role="mediatoko"
                                            type="file"
                                            name="file"
                                            accept="video/*,image/*"
                                            onChange={e => handleChangeFile(e)}
                                            multiple />
                                    </div>
                                    </div>
                                </div>
                                <div className="profile-button-wrapper">
                                    <button className="profile-save-button submit-button" type="submit">
                                        Submit
                                    </button>
                                    <Link to="/"><button className="profile-cancel-button" type="button">
                                        Batalkan
                                    </button></Link>
                                </div>            
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

export default connect(mapStateToProps)(LaporanKerusakan);
