import React from 'react';
import './CardsLaporanMesin.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import axios from 'axios'

const Cards = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CardColumns>
      {posts.map(post => (
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '470px'
            }}
          >
            <Card.Img className="card-pengadaan-img" variant="top" src={post.fotoKerusakan}/>
            <Card.Body>
            <Card.Title className="card-content-limit card-title card-pengadaan-image">
                {post.mainanPengadaan.mainan.namaMainan}
              </Card.Title>
              <Card.Text>
                <p className="card-content-limit">{post.deskripsi}</p>
              </Card.Text>
            </Card.Body>
            <a href={"/detail-laporan-kerusakan/"+post.pk} className="custom-card-walkiddie">
              <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                  Detail
              </button>
            </a>
          </Card>
      ))}
    </CardColumns>
  );
};

export default Cards;