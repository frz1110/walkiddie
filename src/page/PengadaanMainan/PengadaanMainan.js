import 'react-dates/initialize';
import './PengadaanMainan.css'
import PengadaanMainanFirstPage from './PengadaanMainanFirstPage.js'
import PengadaanMainanSecondPage from './PengadaanMainanSecondPage.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useStep } from "react-hooks-helper";
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

const PengadaanMainan = ({ isAuthenticated, user }) => {

    const [formData, setFormData] = useState({
        pkToko: '',
        paketMainan: '',
        mediaTokoList: [],
        totalBiaya: '',
        periodePengadaanMulai: '',
        periodePengadaanAkhir: '',
        estimasiKeuangan: '',
        selectedCheckboxes: []
    });

    console.log(formData)
    const steps = [
        { id: "pilih mainan" },
        { id: "konfirmasi" }
    ];

    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;
    
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const [daftarToko, setDaftarToko] = useState([]);

    const fetchDaftarToko = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
            let allToko = [];
            for(let i=0; i < res.data.length; i++){
                let response = res.data[i];
                let value = response['namaToko'];
                if(response['owner'] === user.email){
                    allToko.push({value:response.pk, label:value});
                }
                console.log(response.pk);
            }
            setDaftarToko(allToko);
            console.log(allToko);
            console.log(daftarToko);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    const [daftarMainan, setDaftarMainan] = useState([]);
    const [totalBiayaMainan, setTotalBiayaMainan] = useState([]);

    const fetchDaftarMainan = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/mainan/`, config);
            setDaftarMainan(res.data);
            let totalBiaya = [];
            for(let i=0; i < res.data.length; i++){
                let response = res.data[i];
                let value = response['harga'];
                totalBiaya.push({id:i ,value:value});
            }
            console.log(totalBiaya);
            setTotalBiayaMainan(totalBiaya);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    useEffect(() => {
        fetchDaftarToko();
        fetchDaftarMainan(); 
    }, []);

    const changeData = checkbox => setFormData({...formData, selectedCheckboxes: checkbox});
    const updateTotalBiaya = (harga,id) => {
        var index = totalBiayaMainan.findIndex(x=> x.id === id);

        let g = totalBiayaMainan[index];
        g['value'] = harga;
        if (index === -1){
            // handle error
            console.log('no match')
        }
        else
            setTotalBiayaMainan([
            ...totalBiayaMainan.slice(0,index),
            g,
            ...totalBiayaMainan.slice(index+1)
            ]
            );
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    switch (id) {
        case "pilih mainan":
            return <PengadaanMainanFirstPage 
                    daftarMainan={daftarMainan} 
                    setState={changeData} 
                    formData={formData} 
                    navigation={navigation} 
                    />;
        case "konfirmasi":
            return <PengadaanMainanSecondPage 
                    daftarMainan={daftarMainan} 
                    daftarToko={daftarToko} 
                    formData={formData} 
                    setFormData={setFormData} 
                    totalBiayaMainan={totalBiayaMainan}
                    setTotalBiayaMainan={updateTotalBiaya}
                    navigation={navigation}
                    />;
        default:
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(PengadaanMainan);