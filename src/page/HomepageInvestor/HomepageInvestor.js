import React, { useState, useEffect } from 'react';
import { Row } from "react-bootstrap";
import { connect } from 'react-redux';
import { ChevronLeft, Search } from 'react-feather';
import { Redirect } from 'react-router-dom';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import Card from 'react-bootstrap/Card'
import Select from 'react-select';
import axios from 'axios';
import _ from 'lodash';
import emptyIcon from '../ListOwnedPengadaan/empty.svg';
import './HomepageInvestor.css'
import '../HomepagePemilikToko/HomepagePemilikToko.css';
import '../ListOwnedPengadaan/ListOwnedPengadaan.css';
import WalkiddieOnboarding from '../../components/OnBoarding/WalkiddieOnboarding';

const HomepageInvestor = ({ isAuthenticated, user }) => {
    const onBoardingSteps = [
        {
            content: <h5>Daftar proyek pengadaan</h5>,
            locale: { skip: <strong aria-label="skip">S-K-I-P</strong> },
            placement: 'center',
            target: 'body',
        },
        {
            content: 'Cari toko yang ingin kamu investasikan.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-i-search',
            title: 'Search',
        },
        {
            content: 'Cari pengadaan sesuai dengan lokasi yang kamu inginkan.',
            placement: 'bottom',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-i-lokasi',
            title: 'Atur Lokasi',
        },
        {
            content: 'Daftar pengadaan yang tersedia. Kamu bisa melakukan investasi ke pengadaan yang belum mencapai 100%.',
            placement: 'top',
            styles: {
                options: {
                    width: 300,
                },
            },
            target: '#h-i-pengadaan',
            title: 'Daftar Pengadaan',
        },
        {
            content: <h4>Selesai</h4>,
            placement: 'center',
            target: 'body',
        },
    ];

    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const [empty, setEmpty] = useState(false);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = "";
    let postLength = 0;
    const [filterChoice, setFilterChoice] = useState([]);

    if (filteredPosts) {
        currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = filteredPosts.length;
    } else if (posts !== []) {
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = posts.length;
    }

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
                res = res.data.filter((e) => {
                    if (e['status'] === "TRM") {
                        return e;
                    }
                });
                console.log(res[0]);
                var res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
                res2 = res2.data.filter((e) => {
                    if (e['status'] === "TRM") {
                        return e;
                    }
                });
                res2.forEach((item, i) => {
                    item.pkPengadaan = item.pk;
                });
                console.log(res2[0]);

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

                if (result.length === 0) {
                    setEmpty(true);
                } else {
                    setEmpty(false);
                }

                const data = filterChange(result, searchTerm, 'namaToko');
                setPosts(data);
                setFilteredPosts();
                setLoading(false);

                let allFilter = [];
                console.log([{ 'value': 123, 'label': 123 }].includes({ 'value': 123, 'label': 123 }));
                console.log(['a', 'b', 'c'].includes('b'));
                if (filterChoice.length === 0) {
                    for (let i = 0; i < data.length; i++) {
                        let response = data[i];
                        let value = response['daerah'];
                        var found = false;
                        for(let j = 0; j < allFilter.length; j++) {
                            if (allFilter[j].value == value) {
                                found = true;
                                break;
                            }
                        }

                        if (!found){
                            allFilter.push({ 'value': value, 'label': value });
                            console.log('masuk');
                            console.log({ 'value': value, 'label': value })
                        }
                    }
                    setFilterChoice(allFilter);
                }
            } catch (e) {
                console.log(e)
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchPosts();
    }, [searchTerm]);

    const handleChange = async e => {
        try{
            var res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/toko/`, config);
            res = res.data.filter((e) => {
                if (e['status'] === "TRM") {
                    return e
                }
            });
        }
        catch (e){
            alert('Terdapat kesalahan pada database toko.');
        };
        try{
            var res2 = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/api/pengadaan/`, config);
            res2 = res2.data.filter((e) => {
                if (e['status'] === "TRM") {
                    return e
                }
            });
        }
        catch(e){
            alert('Terdapat kesalahan pada database pengadaan.');
        }
        let result = [];
        const filterData = filterChange(res, e.value, 'daerah');
        for (let i = 0; i < res2.length; i++) {
            for (let j = 0; j < filterData.length; j++) {
                if (res2[i].toko.pk === filterData[j].pk) {
                    var merging = Object.assign({}, res2[i], filterData[j]);
                        console.log(merging);
                    result.push(merging)
                }
            }
        }
        result = result.filter((e) => {
            if (e['files']) {
                return e
            }
        });

        if (result.length === 0) {
            setEmpty(true);
        } else {
            setEmpty(false);
        }

        setFilteredPosts(result);
        setPosts()
    }

    const filterChange = (data, filterTerm, find) => {
        const filteredData = data.filter((e) => {
            if (filterTerm === "") {
                return e
            }
            else if (e[find].toLowerCase().includes(filterTerm.toLowerCase())) {
                if (e) {
                    return e
                }
            }
        });
        return filteredData
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (!isAuthenticated) return <Redirect to="/masuk" />
    if (user.role !== "Investor") return <Redirect to="/" />

    return (
        <div className='detail-pengadaan-wrapper'
            style={{
                boxSizing: 'border-box'
            }}
        >
            <WalkiddieOnboarding steps={onBoardingSteps} />

            <h3 className="back-button" onClick={() => window.history.back()}><ChevronLeft size="40" className="chevron-left" />Daftar Proyek Pengadaan</h3>
            <Row style={{ margin: "0px", paddingTop: "5px" }} className="justify-content-center">
                <div className="col-4">
                    <Card
                        id="h-i-lokasi"
                        style={{
                            backgroundColor: '#146A5F',
                            fontFamily: "'Manrope', sans-serif"
                        }}
                    >
                        <p style={{
                            paddingTop: '7px',
                        }}
                            className="homepage-investor-filter-title"
                        >
                            Atur Lokasi yang ingin dicari :
                        </p>
                        <div data-testid="select-daerah">
                            <Select
                                class="form-control"
                                placeholder="Pilih nama daerah disini"
                                options={filterChoice}
                                onChange={handleChange}
                            />
                        </div>
                    </Card>
                </div>
                <div className="col-8">
                    <div
                        id="h-i-search"
                        className='input-investor'
                    >
                        <input
                            type="text"
                            placeholder= "Cari pengadaan..."
                            className="homepage-investor-search-bar"
                            onChange={(event) => setSearchTerm(event.target.value)
                            }
                        >
                        </input>
                        <Search />
                    </div>
                    <br></br>
                </div>
            </Row>
            <br />
            {!empty &&
                <Row id="h-i-pengadaan"
                    style={{
                        justifyContent: 'center',
                        margin: "0px"
                    }}
                >
                    <Cards posts={currentPosts} loading={loading} />

                    <Pagination
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        totalPosts={postLength}
                        paginate={paginate}
                    />
                </Row>
            }

            {
                empty && <div className="list-pengadaan-null-wrapper">
                    <img src={emptyIcon} alt="empty data"></img>
                    <h5 className="owned-pengadaan-null">Tidak ada investasi yang tersedia.</h5>
                </div>
            }
        </div>
    );
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(HomepageInvestor);