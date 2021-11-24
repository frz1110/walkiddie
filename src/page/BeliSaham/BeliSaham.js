import React, { useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './BeliSaham.css';

const BeliSaham = ({ isAuthenticated, match, user }) => {

    useEffect(() => {
        handleSubmit();
    }, [match.params.pk]);

    const handleSubmit = async () => {
        const config = {
            headers: {
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        }
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/investasi/penjualan/${match.params.pk}/beli/`, {}, config);
    }

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return (
        <div className="container mt-5 overflow-hidden mi-ctn">
        <h1 className="mi-title">Terima kasih. Mohon menunggu verifikasi pembelian.</h1>
        <br />
        <button className="wkd-nav-button wkd-light-tosca-button" onClick={() => window.history.back()}>Kembali</button>
        <br />
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(BeliSaham);
