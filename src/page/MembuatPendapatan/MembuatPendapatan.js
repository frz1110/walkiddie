import './MembuatPendapatan.css';
import Select from 'react-select';
import axios from 'axios';
import { ChevronLeft } from 'react-feather';
import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

const Profile = ({ isAuthenticated }) => {
    const [loading, setLoading] = useState(false);

    const config = {
        headers: {
            'content-type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const [formData, setFormData] = useState({
        pk: '',
        tanggal_pendapatan: '',
        pendapatan: ''
    });

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleChange = async (e) => setFormData({ ...formData, pk: e.value });


    const [daftarPengadaan, setDaftarPengadaan] = useState([]);

    const fetchDaftarPengadaan = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
            let allPengadaan = [];
            for(let i=0; i < res.data.length; i++){
                let response = res.data[i];
                let value = response.toko.namaToko;
                if(response['status'] === "TRM"){
                    allPengadaan.push({value:response.pk, label:value});
                }
            }
            setDaftarPengadaan(allPengadaan);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        postPendapatan();
    }

    const postPendapatan = () => {
        
        if (localStorage.getItem('access')) {
            var formDataToSend = new FormData();

            formDataToSend.append('pendapatan', formData['pendapatan']);
            formDataToSend.append('tanggal_pendapatan', formData['tanggal_pendapatan']);

            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/${formData['pk']}/sales/`, formDataToSend, config)
                .then((response) => {
                    console.log(response);
                    console.log('Success post');
                    alert('Anda telah memasukan pendapatan pengadaan mainan');
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
                    alert("Terdapat kesalahan. Pendapatan pengadaan mainan yang Anda lakukan sudah ada. Silakan mengecek kembali tanggal yang Anda masukan dan refresh ulang halaman ini dan perbaiki pengadaan Anda.")
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    }

    useEffect(() => {
        fetchDaftarPengadaan();
    }, []);


    if (!isAuthenticated) {
        return <Redirect to='/masuk' />
    }

    return (
        <div className="profile-form">
            <form className="profile-styling" onSubmit={handleSubmit}>
                <h3 className="profile-header" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left"/>Buat Pendapatan Toko</h3>
                <Row className="justify-content-center">
                    <div className="col-lg-3">
                        <div className="profile-button-wrapper">
                            <Link to="/"><button className="profile-cancel-button" type="button">
                                Batal
                            </button></Link>
                            <button className="profile-save-button submit-button" type="submit">
                                Simpan
                            </button>
                        </div>
                    </div>
                    
                    <div className="col-lg-9">
                        <div className="square-box-2">
                                <div className="col-sm">
                                    <div className="profile-form-container">
                                    <label htmlFor='pk' className="col-sm-3 col-form-label"> <span className="required">*</span> Pilih Pengadaan :</label>
                                        <Select
                                            id="pk"
                                            role="pk"
                                            name='pk'
                                            class="form-control"
                                            placeholder="Pilih Pengadaan"
                                            options={daftarPengadaan}
                                            onChange={e => handleChange(e)}
                                        />
                                </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='tanggal_pendapatan'> Tanggal Pendapatan </label>
                                        <br></br>
                                        <input
                                            id='tanggal_pendapatan'
                                            name='tanggal_pendapatan'
                                            required
                                            type="date"
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
                                    <div className="profile-form-container">
                                        <label htmlFor='pendapatan'> Jumlah Pendapatan </label>
                                        <br></br>
                                        <input
                                            id='pendapatan'
                                            type='text'
                                            name='pendapatan'
                                            pattern='[0-9]*'
                                            required
                                            onChange={e => onChange(e)}
                                        />
                                    </div>
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
