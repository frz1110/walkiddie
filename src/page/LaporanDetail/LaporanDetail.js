import './LaporanDetail.css'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'react-feather';


const LaporanDetail = ({ isAuthenticated, match, user }) => {
    const [laporan, setLaporan] = useState({});
    const [detail, setDetail] = useState({});

    const configGet = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const configPut = {
        headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const handleAssign = async () => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${match.params.pk}/assign/`, {}, configPut);
        setTimeout('window.location.href="/operator"', 0);
    }

    const handleRefuse = async () => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${match.params.pk}/unassign/`, {}, configPut);
        setTimeout('window.location.href="/operator"', 0);
    }

    const handleResolve = async () => {
        await axios.patch(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${match.params.pk}/resolve/`, {}, configPut);
        setTimeout('window.location.href="/operator"', 0);
    }

    const fetchDetail = async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/${match.params.pk}/detail/`, configGet);
            res = res.data;
            let pkObj = {pk: res.pk};
            let namaMainanObj = {namaMainan: res.mainanPengadaan.mainan.namaMainan};
            let namaTokoObj = {namaToko: res.mainanPengadaan.pengadaan.toko.namaToko};
            let lokasiTokoObj = {lokasiToko: res.mainanPengadaan.pengadaan.toko.lokasiToko};
            let nomorTeleponObj = {nomorTelepon: res.mainanPengadaan.pengadaan.toko.nomorTelepon};
            let assignedToObj = (res.status === "NAS") ? {assignedTo: "None"} : {assignedTo: res.operator};
            let detail = Object.assign({}, pkObj, namaMainanObj, namaTokoObj, lokasiTokoObj, nomorTeleponObj, assignedToObj);
            
            setLaporan(res);
            setDetail(detail);
            console.log("res.data");
            console.log(res);
            console.log("after useState");
            console.log(laporan);
            console.log("detail");
            console.log(detail);
        } catch (e) {
            console.log(e);
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    }

    useEffect(() => {
        fetchDetail();
        console.log(laporan);
        console.log(detail);
    }, []);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Operator") return <Redirect to="/" />

    return (
        <div className="container mt-5 overflow-hidden mi-ctn">
        <h3 className="back-button" data-testid="back" onClick={() => setTimeout('window.location.href="/operator"', 0)}><ChevronLeft size="40" className="chevron-left" />Kembali</h3>
            <div className="row row-cols-1 row-cols-lg-2 mi-text-start mt-5">
                <div className="col px-4">
                    <div className="row row-cols-1">
                    <img src={laporan.fotoKerusakan} alt="photo broken machine"></img>
                    </div>
                </div>

                <div className="col px-5">
                    <table>
                        <tr>
                            <td><b>Nama Permainan</b></td>
                            <td>: {detail.namaMainan}</td>
                        </tr>
                        <tr>
                            <td><b>Nama Toko</b></td>
                            <td>: {detail.namaToko}</td>
                        </tr>
                        <tr>
                            <td><b>Alamat</b></td>
                            <td>: {detail.lokasiToko}</td>
                        </tr>
                        <tr>
                            <td><b>Kontak Pemilik Toko</b></td>
                            <td>: {detail.nomorTelepon}</td>
                        </tr>
                        <tr>
                            <td><b>Assigned to</b></td>
                            <td>: {detail.assignedTo}</td>
                        </tr>
                    </table>

                    <h5 id="m-i-tatacara" className="mt-4"><b>Deskripsi Kerusakan</b></h5>
                    <p>{laporan.deskripsi}</p>
                </div>
            </div>
            <div className="row mt-4 mb-5">
                <div className="col">
                {laporan.status === "NAS" && <>
                <button data-testid="m-i-buat-0" className="wkd-nav-button wkd-dark-green-button" onClick={() => handleAssign()}>Perbaiki</button>
                </>
                }
                
                {laporan.status === "ASG" && <>
                    <button data-testid="m-i-buat-1" className="wkd-nav-button wkd-light-tosca-button" onClick={() => handleRefuse()}>Batalkan</button>
                    <button data-testid="m-i-buat-2" className="wkd-nav-button wkd-dark-green-button" onClick={() => handleResolve()}>Selesai</button>
                </>
                }

                {laporan.status === "RSV" && <> </>}

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(LaporanDetail);