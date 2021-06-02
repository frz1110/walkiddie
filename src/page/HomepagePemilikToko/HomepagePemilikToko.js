import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import './HomepagePemilikToko.css'
import DaftarkanToko from './pemilik-toko-daftarkan-toko.svg';
import LihatInvestasi from './pemilik-toko-lihat-investasi.svg';
import axios from 'axios';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';

const HomepagePemilikToko = ({ isAuthenticated, user }) => {
    const [daftarTokoItems, setDaftarTokoItems] = useState([]);
    const [daftarTokoLoading, setDaftarTokoLoading] = useState(false);
    const [daftarTokoCurrentPage, setDaftarTokoCurrentPage] = useState(1);
    const [daftarTokoPostsPerPage, setDaftarTokoPostsPerPage] = useState(3);
    const daftarTokoIndexOfLastPost = daftarTokoCurrentPage * daftarTokoPostsPerPage;
    const daftarTokoIndexOfFirstPost = daftarTokoIndexOfLastPost - daftarTokoPostsPerPage;
    let daftarTokoCurrentPosts = "";
    let daftarTokoPostLength = 0;

    const [daftarPengadaanItems, setDaftarPengadaanItems] = useState([]);
    const [daftarPengadaanLoading, setDaftarPengadaanLoading] = useState(false);
    const [daftarPengadaanCurrentPage, setDaftarPengadaanCurrentPage] = useState(1);
    const [daftarPengadaanPostsPerPage, setDaftarPengadaanPostsPerPage] = useState(3);
    const daftarPengadaanIndexOfLastPost = daftarPengadaanCurrentPage * daftarPengadaanPostsPerPage;
    const daftarPengadaanIndexOfFirstPost = daftarPengadaanIndexOfLastPost - daftarPengadaanPostsPerPage;
    let daftarPengadaanCurrentPosts = "";
    let daftarPengadaanPostLength = 0;

    if (daftarTokoItems !== []) {
        daftarTokoCurrentPosts = daftarTokoItems.slice(daftarTokoIndexOfFirstPost, daftarTokoIndexOfLastPost);
        daftarTokoPostLength = daftarTokoItems.length;
    }
    if (daftarPengadaanItems !== []) {
        daftarPengadaanCurrentPosts = daftarPengadaanItems.slice(daftarPengadaanIndexOfFirstPost, daftarPengadaanIndexOfLastPost);
        daftarPengadaanPostLength = daftarPengadaanItems.length;
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    const fetchDaftarTokoItems = async () => {
        try {
            setDaftarTokoLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setDaftarTokoItems(res.data);
            setDaftarTokoLoading(false);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    const fetchDaftarPengadaanItems = async () => {
        try {
            setDaftarPengadaanLoading(true);
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
            const res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);

            console.log("api/toko")
            console.log(res)
            console.log("api/pengadaan")
            console.log(res2)
            res2.data.forEach((item, i) => {
                item.pkToko = item.pk;
            });

            var merged = _.merge(_.keyBy(res.data, 'pk'), _.keyBy(res2.data, 'toko'));
            var result = _.values(merged);

            console.log("result")
            console.log(result)

            setDaftarPengadaanItems(result);
            setDaftarPengadaanLoading(false);
        } catch {
            alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
        }
    };

    useEffect(() => {
        fetchDaftarTokoItems();
        fetchDaftarPengadaanItems();
    }, []);

    const daftarTokoPaginate = daftarPageNumber => setDaftarTokoCurrentPage(daftarPageNumber);
    const daftarPengadaanPaginate = daftarPageNumber => setDaftarPengadaanCurrentPage(daftarPageNumber);

    // if (!isAuthenticated) return <Redirect to="/masuk" />
    // if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div className="pemilik-toko-wrapper">
            <div className="pemilik-toko-sect-1">
                <div className="pemilik-toko-sect-1-content">
                    <h3 className="investor-h2 text-align-left"
                        style={{ padding: '0', margin: '0' }}
                    >Halo, <span className="investor-text">{user.first_name} {user.last_name} !</span></h3>
                    <h6 className="greeting-msg text-align-left"
                        style={{ padding: '0', margin: '0' }}
                    >Selamat datang kembali di <span style={{ fontWeight: "700", fontSize: "25px", color: "#146A5F" }}>Walkiddie.</span></h6>
                </div>
            </div>

            <div className="pemilik-toko-sect-2">
                <div className="investor-card-container">
                    <Link to="/daftar-toko">
                        <img src={DaftarkanToko} alt="Daftarkan-toko" className="investor-card-menu" />
                    </Link>
                    <Link to="/">
                        <img src={LihatInvestasi} alt="Lihat-investasi" className="investor-card-menu" />
                    </Link>
                </div>
                <div className="list-pemilik-toko">
                    <div className="">
                        <h3 className="text-align-left pemilik-toko-h3" >Daftar Pengadaan</h3>

                        <Cards posts={daftarPengadaanCurrentPosts} loading={daftarPengadaanLoading} />
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

                <div className="list-pemilik-toko mt-5">
                    <div className="">
                        <h3 className="text-align-left pemilik-toko-h3" >Daftar Toko</h3>
                        <Cards posts={daftarTokoCurrentPosts} loading={daftarTokoLoading} />
                        <Row
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Pagination
                                currentPage={daftarTokoCurrentPage}
                                postsPerPage={daftarTokoPostsPerPage}
                                totalPosts={daftarTokoPostLength}
                                paginate={daftarTokoPaginate}
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

export default connect(mapStateToProps)(HomepagePemilikToko);