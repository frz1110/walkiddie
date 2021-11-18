import './LaporanKerusakan.css';
import Select from 'react-select';
import axios from 'axios';
import { ChevronLeft } from 'react-feather';
import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Profile = ({ isAuthenticated, userData }) => {

    const imageUploader = React.useRef(null);

    if (!isAuthenticated) {
        return <Redirect to='/masuk' />
    }else if (userData.role != 'Mitra'){
        return (<Redirect to="/" />)
    }

    return (
        <div className="profile-form">
            <form className="profile-styling">
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
                                        value="TBA"
                                        disabled
                                        // onChange={e => onChange(e)}
                                    />
                                </div>
                                <div className="profile-form-container">
                                        <label htmlFor='lokasi'> Lokasi </label>
                                        <br></br>
                                        <input
                                            id='lokasi'
                                            type='text'
                                            name='lokasi'
                                            value="Alamat"
                                            disabled
                                            // onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='deskripsi'> Deskripsi Kerusakan </label>
                                        <br></br>
                                        <input
                                            id='deskripsi'
                                            type='text'
                                            name='deskripsi'
                                            required
                                            // onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='bukti'> Bukti Kerusakan </label>
                                        <br></br>
                                        <div onClick={() => imageUploader.current.click()} className="edit-wrapper">
                                        <input type="file" id='profile_picture' accept="image/*" ref={imageUploader} />
                                        </div>
                                    </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='periode'> Periode Pelaporan </label>
                                        <br></br>
                                        <input
                                            id='periode'
                                            name='periode'
                                            required
                                            type="date"
                                            // onChange={e => onChange(e)}
                                        />
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

export default connect(mapStateToProps)(Profile);
