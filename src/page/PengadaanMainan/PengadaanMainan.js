import 'react-dates/initialize';
import './PengadaanMainan.css'
import PengadaanMainanFirstPage from './PengadaanMainanFirstPage.js'
import PengadaanMainanSecondPage from './PengadaanMainanSecondPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStep } from "react-hooks-helper";
import React, { useState } from 'react';
import Select from 'react-select';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PengadaanMainan = ({ isAuthenticated, user }) => {

    const [formData, setFormData] = useState({
        namaToko: '',
        paketMainan: [],
        mediaTokoList: [],
        totalBiaya: '',
        periodePengadaanMulai: '',
        periodePengadaanAkhir: '',
        estimasiKeuangan: ''
    });

    const steps = [
        { id: "pilih mainan" },
        { id: "konfirmasi" }
    ];

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    
    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    switch (id) {
        case "pilih mainan":
            return <PengadaanMainanFirstPage setFormData={setFormData} navigation={navigation} />;
        case "konfirmasi":
            return <PengadaanMainanSecondPage formData={formData} setFormData={setFormData} navigation={navigation}/>;
        default:
            return null;
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(PengadaanMainan);