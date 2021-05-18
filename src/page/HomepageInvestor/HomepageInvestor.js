import React, { useState, useEffect } from 'react';
import Cards from '../../components/Cards/Cards';
import Pagination from '../../components/Pagination/Pagination';
import Card from 'react-bootstrap/Card'
import { Row,Col } from "react-bootstrap";
import Select from 'react-select';
import axios from 'axios';
import { connect } from 'react-redux';
import './HomepageInvestor.css'

const HomepageInvestor = ({ isAuthenticated ,user }) => {
// const HomepageInvestor = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentPosts = "";
    let postLength = 0;
    const filterChoice = [
        {
          value: "aut",
          label: "aut"
        },
        {
          value: "facere",
          label: "facere"
        },
        {
          value: "qui",
          label: "qui"
        },
        {
          value: "consequatur",
          label: "consequatur"
        }
    ];

    if (filteredPosts) {
        currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = filteredPosts.length;
    } else if(posts !== []){
        currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
        postLength = posts.length;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            // const searchData = [];
            try {
                setLoading(true);
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
                const data = filterChange(res.data, searchTerm);
                setPosts(data);
                setFilteredPosts();
                // setPosts(res.data);
                setLoading(false);
            } catch {
                alert('Terdapat kesalahan pada database. Mohon refresh ulang halaman ini')
            }
        };

        fetchPosts();
    }, [searchTerm]);

    const handleChange = async e => {
        console.log(e.value)
        const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        console.log(res.data)
        const filterData = filterChange(res.data, e.value);
        setFilteredPosts(filterData);
        setPosts()
    }

    const filterChange = (data, filterTerm) => {
        const filteredData = data.filter((e) => {
            if (filterTerm === ""){
                return e
            }
            else if (e.title.toLowerCase().includes(filterTerm.toLowerCase())) {
                if (e) {
                    return e
                }
            }
        });
        return filteredData
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container mt-5 justify-content-center'>
            <h1>Proyek Pengadaan Barang</h1>
            <Row className='justify-content-center'>
                <input
                    style={{
                        width: '70%',
                        heigth: '30px'
                    }}
                    type="text"
                    placeholder="Search"
                    onChange={(event) => setSearchTerm(event.target.value)
                    }
                >
                </input>
            </Row>
            <Row>
                <Col sm={4}>
                    <Card 
                        style={{
                            width: '350px',
                            height: '80px'
                        }}
                    >
                        <p>
                            Filter Daerah
                        </p>
                        <div data-testid="select-daerah">
                            <Select 
                                style={{
                                    width: '900px',
                                    height: '100px'
                                }}
                                class="form-control"
                                placeholder="Beji,Depok"
                                // value={dataPilihanMainan.find(obj => obj.value === selectedValue)}
                                options={filterChoice}
                                onChange={handleChange}
                            />
                        </div>
                    </Card>
                </Col>
                <Col sm={8}>
                    <Cards posts={currentPosts} loading={loading} />
                </Col>
            </Row>
            <Row
                style={{
                    justifyContent: 'center'
                }}
            >
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={postLength}
                    paginate={paginate}
                />
            </Row>
        </div>
    );

};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(HomepageInvestor);


// export default HomepageInvestor;