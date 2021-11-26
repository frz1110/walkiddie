import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import CardsDaftarToko from '../../components/CardsDaftarToko/CardsDaftarToko';
import Pagination from '../../components/Pagination/Pagination';
import './HomepagePemilikToko.css'
import DaftarkanToko from './pemilik-toko-daftarkan-toko.svg';
import LaporanMesin from './pemilik-toko-laporan-mesin.svg';
import axios from 'axios';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import _ from 'lodash';
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';

const HomepagePemilikToko = ({ isAuthenticated, user }) => {
    const onBoardingSteps = [
        {
            content: <h5>Homepage mitra</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Daftarkan toko yang kamu miliki agar dapat di investasikan.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-p-daftarkantoko',
            title: 'Daftarkan Toko',
        },
        {
            content: 'Lihat laporan investasi yang dimiliki.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-p-laporan',
            title: 'Laporan Investasi',
        },
        {
            content: 'Daftar pengadaan yang kamu miliki. ',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-p-pengadaan',
            title: 'Investasi yang dimiliki',
        },
        {
            content: 'Daftar toko yang kamu miliki. ',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-p-toko',
            title: 'Toko yang dimiliki',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    const [daftarTokoItems, setDaftarTokoItems] = useState([]);
    const [daftarTokoLoading, setDaftarTokoLoading] = useState(false);
    const [daftarTokoCurrentPage, setDaftarTokoCurrentPage] = useState(1);
    const daftarTokoPostsPerPage = 3;
    const daftarTokoIndexOfLastPost = daftarTokoCurrentPage * daftarTokoPostsPerPage;
    const daftarTokoIndexOfFirstPost = daftarTokoIndexOfLastPost - daftarTokoPostsPerPage;
    let daftarTokoCurrentPosts = "";
    let daftarTokoPostLength = 0;

    const [daftarPengadaanItems, setDaftarPengadaanItems] = useState([]);
    const [daftarPengadaanLoading, setDaftarPengadaanLoading] = useState(false);
    const [daftarPengadaanCurrentPage, setDaftarPengadaanCurrentPage] = useState(1);
    const daftarPengadaanPostsPerPage = 3;
    const daftarPengadaanIndexOfLastPost = daftarPengadaanCurrentPage * daftarPengadaanPostsPerPage;
    const daftarPengadaanIndexOfFirstPost = daftarPengadaanIndexOfLastPost - daftarPengadaanPostsPerPage;
    let daftarPengadaanCurrentPosts = "";
    let daftarPengadaanPostLength = 0;

    daftarTokoCurrentPosts = daftarTokoItems.slice(daftarTokoIndexOfFirstPost, daftarTokoIndexOfLastPost);
    daftarTokoPostLength = daftarTokoItems.length;
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
                setDaftarTokoLoading(true);
                setDaftarPengadaanLoading(true);
                var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
                res = res.data.filter((e) => {
                    if (e['status'] === "TRM" && e['owner'] === user.email) {
                        return e;
                    }
                });
                console.log(user.email);
                console.log(res[0]);
                var res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
                res2 = res2.data.filter((e) => {
                    if (e['status'] === "TRM") {
                        return e;
                    }
                });
                console.log(res2[0]);
                res2.forEach((item, i) => {
                    item.pkPengadaan = item.pk;
                });

                console.log("api/toko")
                console.log(res)
                console.log("api/pengadaan")
                console.log(res2)

                let result = [];
                for (let i = 0; i < res2.length; i++) {
                    for (let j = 0; j < res.length; j++) {
                        if (res2[i].toko.pk === res[j].pk) {
                            var merging = Object.assign({}, res2[i], res[j]);
                            console.log(merging);
                            result.push(merging)
                        }
                    }
                }
                result = result.filter((e) => {
                    if (e['files']) {
                        return e;
                    }
                });

                console.log("result")
                console.log(result)


                setDaftarTokoItems(res);
                setDaftarTokoLoading(false);
                setDaftarPengadaanItems(result);
                setDaftarPengadaanLoading(false);
            } catch(e) {
                console.log(e)
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchItemstoDisplay()
    }, []);

    const daftarTokoPaginate = daftarPageNumber => setDaftarTokoCurrentPage(daftarPageNumber);
    const daftarPengadaanPaginate = daftarPageNumber => setDaftarPengadaanCurrentPage(daftarPageNumber);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Mitra") return <Redirect to="/" />

    return (
        <div className="pemilik-toko-wrapper">
            <WalkiddieOnboarding steps={onBoardingSteps} />

            <div className="pemilik-toko-sect-1">
                <div className="pemilik-toko-sect-1-content">
                    <h3 className="investor-h2 text-align-left"
                        style={{ padding: '0', margin: '0' }}>
                        Halo, <span className="investor-text">{user.first_name} {user.last_name} !</span></h3>
                    <h6 className="greeting-msg text-align-left"
                        style={{ padding: '0', margin: '0' }}
                    >Selamat datang kembali di <span style={{ fontWeight: "700", fontSize: "25px", color: "#146A5F" }}>Walkiddie.</span></h6>
                </div>
            </div>

            <div className="pemilik-toko-sect-2">
                <div className="investor-card-container">
                    <Link to="/daftar-toko">
                        <img id="h-p-daftarkantoko" src={DaftarkanToko} alt="Daftarkan-toko" className="investor-card-menu" />
                    </Link>
                    <Link to="/laporan-mesin">
                        <img id="h-p-laporan" src={LaporanMesin} alt="Lihat-investasi" className="investor-card-menu" />
                    </Link>
                </div>
                <div id="h-p-pengadaan" className="list-pemilik-toko">
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
                    <a href={"/membuat-pendapatan/"} className="custom-card-walkiddie">
                    <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                        Buat Pendapatan
                    </button>
                    </a>
                </div>

                <div id="h-p-toko" className="list-pemilik-toko mt-5">
                    <div className="">
                        <h3 className="text-align-left pemilik-toko-h3" >Daftar Toko</h3>
                        <CardsDaftarToko posts={daftarTokoCurrentPosts} loading={daftarTokoLoading} />
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