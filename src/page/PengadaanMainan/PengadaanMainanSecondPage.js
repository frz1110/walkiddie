import React, { useState } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { DateRangePicker } from 'react-dates';
import 'react-calendar/dist/Calendar.css';
import 'react-dates/lib/css/_datepicker.css';
import AlurPendaftaran from './pengadaan-mainan.svg';
import Minus from './minus.svg'
import Plus from './plus.svg'
import TempatSampah from './tempat-sampah.svg'
import axios from 'axios';


const PengadaanMainanSecondPage = ({ setFormData, formData, navigation }) => {
    console.log(formData['paketMainan'])
    const { previous } = navigation;
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [countPaket, setCountPaket] = useState(1);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleDatesChange = ({ startDate, end }) => {
        setStartDate(startDate);
        setEndDate(end);
        if (startDate !== null && endDate !== null) {
            setFormData({
                ...formData,
                periodePengadaanMulai: startDate.format("YYYY-MM-DD"),
                periodePengadaanAkhir: endDate.format("YYYY-MM-DD")
            })
        }else{
            console.log("Tanggal Yang Anda masukan error")
        }
    };

    const handleChangeFile = (event) => {
        setFormData({ ...formData, mediaTokoList: event.target.files });
    }

    const dataPilihanMainan = [
        {
            value: "PaketA",
            label: "Paket A (2 kiddie ride + 1 claw machine)"
        },
        {
            value: "PaketB",
            label: "Paket B (2 kiddie ride )"
        },
        {
            value: "PaketC",
            label: "Paket C (1 kiddie ride + 1 claw machine)"
        }
    ];

    const dataPilihanToko = [
        {
            value: "Resto Bebek H. Selamet Cabang Margonda",
            label: "Resto Bebek H. Selamet Cabang Margonda"
        },
        {
            value: "Resto Bebek H. Selamet Cabang UI",
            label: "Resto Bebek H. Selamet Cabang UI"
        },
        {
            value: "Resto Bebek H. Selamet Cabang Beji",
            label: "Resto Bebek H. Selamet Cabang Beji"
        }
    ];

    const handleChange = e => {
        if (e.value === "PaketA") {
            setFormData({ ...formData, totalBiaya: 1000000, paketMainan: e.value })
        } else if (e.value === "PaketB") {
            setFormData({ ...formData, totalBiaya: 900000, paketMainan: e.value })
        } else {
            setFormData({ ...formData, totalBiaya: 800000, paketMainan: e.value })
        }
    }

    const handleSubmit = e => {
        postPengadaanMainan();
    }

    const postPengadaanMainan = () => {
        if (localStorage.getItem('access')) {
            var formDataToSend = new FormData();

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            };

            formDataToSend.append('namaToko', formData['namaToko']);
            formDataToSend.append('paketMainan', formData['paketMainan'].toString());
            for (let file in formData['mediaTokoList']) {
                console.log(file);
                formDataToSend.append('mediaToko', formData['file']);
            }
            formDataToSend.append('totalBiaya', formData['totalBiaya']);
            formDataToSend.append('periodePengadaanMulai', formData['periodePengadaanMulai']);
            formDataToSend.append('periodePengadaanAkhir', formData['periodePengadaanAkhir']);
            formDataToSend.append('estimasiKeuangan', formData['estimasiKeuangan']);

            axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, formDataToSend, config)
                .then((response) => {
                    console.log(response);
                    console.log('Success post');
                    alert('Success post')
                }, (error) => {
                    console.log(error);
                    console.log('Error post');
                    alert('Terdapat kesalahan saat melakukan submit. Silahkan isi ulang form')
                });
        } else {
            console.log('missing token');
            alert('Terdapat kesalahan pada autentikasi akun anda. Anda dapat melakukan refresh pada halaman ini')
        }
    }

    return (
        <div>
            <div className="wkd-home-sect-2-bg"
                style={{
                    height: '400px',
                    maxWidth: '1500px'
                }}
            >
                <div className="wkd-home-sect-2-container"
                    style={{
                        marginBottom: '100px'
                    }}
                >
                    <img src={AlurPendaftaran} alt="Walkiddie Icon"></img>
                </div>
            </div>


            <div className="wkd-home-sect-3-container">
                <div className="wkd-home-banner-card"
                    style={{
                        borderRadius: '7px'
                    }}
                >
                    <div
                        style={{
                            textAlign: 'left'
                        }}>
                        <h2> Pengadaan Mainan </h2>
                        <p>Buat pengadaan dan raih keuntungannya.</p>
                        <br></br>
                        <form className="centered" onSubmit={handleSubmit}>
                            <div className="justify-content-center">
                                <h3 className="midtext" ><span>Ringkasan Mainan</span></h3>
                                <br></br>
                                <div className="profile-details-wrapper flex-wrapper">
                                <img src={TempatSampah} alt="Delete Icon"></img>
                                <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                    <div className="profile-details" id="desc">
                                        <h4>Spongebob Kiddie Cart</h4>
                                        <p>Rp 7,200,000.00</p>
                                    </div>
                                    <div className="profile-details">

                                        <img onClick={() => setCountPaket(num => num-1)} className="icon" src={Minus}></img>
                                        {countPaket}
                                        <img onClick={() => setCountPaket(num => num+1)} className="icon" src={Plus}></img>
                                    </div> 
                                    <div className="profile-details">
                                        <h3>Rp 7,200,000.00</h3>
                                    </div>
                                </div>
                                {/* <h3> */}
                                    {/* <div
                                        style={{
                                            float:'left'
                                        }}
                                    >
                                        <img src={TempatSampah} alt="Delete Icon"></img>
                                        <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                        <div 
                                        // style={{
                                        //     verticalAlign: 'top'
                                        // }}
                                        >
                                            Spongebob Kiddie Cart
                                            <br></br>
                                            Rp 7,200,000.00
                                        </div>
                                        <img src={Minus}></img> 1 <img src={Plus}></img>
                                    </div> */}
                                    {/* <div class="banner">
                                        <div class="wrapper">
                                            <p>
                                                <img src="https://i.stack.imgur.com/y9DpT.jpg" className="review-pengadaan-mainan"></img>
                                                <span>
                                                    Line one of text
                                                </span>
                                                <br></br>
                                                <span class="ban2">
                                                    Line 2 of text
                                                </span>
                                            </p>
                                        </div>
                                    </div> */}
                                    {/* <div
                                        style={{
                                            float:'right'
                                        }}
                                    >
                                        <img src={Minus}></img>
                                        1
                                        <img src={Plus}></img>
                                    </div>
                                    <div
                                        style={{
                                            clear:'left'
                                        }}
                                    /> */}
                                {/* </h3> */}

                                <h3 className="midtext" ><span>Informasi Pengadaan</span></h3>
                                <br></br>
                                <div className="form-group row">
                                    <label htmlFor='namaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span> Nama Toko :</label>
                                    <div className="col-sm-9" data-testid="select-nama-toko">
                                        <Select
                                            id="namaToko"  
                                            role="namaToko"
                                            class="form-control"
                                            placeholder="Pilih toko"
                                            options={dataPilihanToko}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='mediaToko' className="col-sm-3 col-form-label"> <span className="required"> * </span>Foto/Video Toko (tampak depan/tampak belakang/video singkat):</label>
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
                                <div className="form-group row">
                                    <label htmlFor='totalBiaya' className="col-sm-3 col-form-label"> Total Biaya pengadaan :</label>
                                    <div className="col-sm-9">
                                        <input className="form-control" id="totalBiaya" type="text" placeholder={formData['totalBiaya']} disabled />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='periodePengadaan' className="col-sm-3 col-form-label"> <span className="required"> * </span> Periode pengadaan :</label>
                                    <div className="col-sm-9">
                                        <DateRangePicker
                                            startDate={startDate}
                                            startDateId="tata-start-date"
                                            endDate={endDate}
                                            endDateId="tata-end-date"
                                            startDatePlaceholderText="Tanggal Mulai Pengadaan"
                                            endDatePlaceholderText="Tanggal Akhir Pengadaan"
                                            onDatesChange={handleDatesChange}
                                            focusedInput={focusedInput}
                                            displayFormat={() => "DD/MM/YYYY"}
                                            onFocusChange={focusedInputParam => setFocusedInput(focusedInputParam)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor='estimasiKeuangan' className="col-sm-3 col-form-label"> <span className="required"> * </span> Estimasi Keuangan :</label>
                                    <div className="col-sm-9">
                                        <textarea
                                            id='estimasiKeuangan'
                                            type='text'
                                            rows='3'
                                            placeholder='Jelaskan mekanisme ROI, Payback period, BEP, dan lain sebagainya'
                                            name='estimasiKeuangan'
                                            value={formData['estimasiKeuangan']}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div 
                            style={{
                                float:'right'
                            }}
                            >
                                <button className="wkd-nav-button wkd-light-tosca-button" onClick={previous}>Sebelumnya</button>
                                <button className="wkd-nav-button wkd-dark-green-button" type="submit">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PengadaanMainanSecondPage;
