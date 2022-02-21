import React, { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination/Pagination';
import CardsLaporanMesin from '../../components/CardsLaporanMesin/CardsLaporanMesin';
import './ListLaporanMesin.css'
import axios from 'axios';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

const ListLaporanMesin = ({ isAuthenticated, user }) => {
    const [daftarPengadaanItems, setDaftarPengadaanItems] = useState([]);
    const [daftarPengadaanLoading, setDaftarPengadaanLoading] = useState(false);
    const [daftarPengadaanCurrentPage, setDaftarPengadaanCurrentPage] = useState(1);
    const daftarPengadaanPostsPerPage = 3;
    const daftarPengadaanIndexOfLastPost = daftarPengadaanCurrentPage * daftarPengadaanPostsPerPage;
    const daftarPengadaanIndexOfFirstPost = daftarPengadaanIndexOfLastPost - daftarPengadaanPostsPerPage;
    let daftarPengadaanCurrentPosts = "";
    let daftarPengadaanPostLength = 0;

    daftarPengadaanCurrentPosts = daftarPengadaanItems.slice(daftarPengadaanIndexOfFirstPost, daftarPengadaanIndexOfLastPost);
    daftarPengadaanPostLength = daftarPengadaanItems.length;

    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
            }
        };

        const fetchItemstoDisplay = async () => {
            try {
                var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/laporan/`, config);
                res = res.data.filter((e) => {
                    if (e['mitra'] === user.email) {
                        return e;
                    }
                });
                
                setDaftarPengadaanItems(res);
                setDaftarPengadaanLoading(false);
            } catch(e) {
                console.log(e)
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchItemstoDisplay()
    }, []);

    const daftarPengadaanPaginate = daftarPageNumber => setDaftarPengadaanCurrentPage(daftarPageNumber);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div className="pemilik-toko-wrapper">
        
            <div className="pemilik-toko-sect-2">
                
                <div id="h-p-pengadaan" className="list-pemilik-toko">
                    <div className="">
                        <h3 className="text-align-left pemilik-toko-h3" >Laporan Mesin Anda</h3>

                        <CardsLaporanMesin posts={daftarPengadaanCurrentPosts} loading={daftarPengadaanLoading} />
                        <Row
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Pagination
                                currentPage={daftarPengadaanCurrentPage}
                                postsPerPage={daftarPengadaanPostsPerPage}
                                totalPosts={daftarPengadaanPostLength}
                                paginate={daftarPengadaanPaginate}
                            />
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(ListLaporanMesin);