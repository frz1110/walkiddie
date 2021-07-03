import React from 'react';
import './Cards.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import ProgressBar from 'react-bootstrap/ProgressBar'

const Cards = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CardColumns>
      {posts.map(post => (
        <a href={"/detail-pengadaan/"+post.pkPengadaan} className="custom-card-walkiddie">
          {(post.danaTerkumpul !== post.totalBiaya) &&
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '470px'
            }}
          >
            <Card.Img className="card-pengadaan-img" variant="top" src={post.files[0]}/>
            <Card.Body>
              <Card.Title className="card-content-limit card-title card-pengadaan-image">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
                <div className="detail-pengadaan-store-name">
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>{post.namaCabang}</span>
                </div>
                <br/>
              <ProgressBar variant="success" now={(post.danaTerkumpul/post.totalBiaya*100) + 10} label={(post.danaTerkumpul/post.totalBiaya*100) + "%"} />
              <Card.Text>
                <p className="card-content-limit">{post.deskripsiToko}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          }
           {(post.danaTerkumpul === post.totalBiaya) &&
          <Card className="card-flex-item" key={post.pk}
            style={{
              height : '470px',
              backgroundColor : '#DCDCDC'
            }}
          >
            <Card.Img className="card-pengadaan-img" variant="top" src={post.files[0]} />
            <Card.Body>
              <Card.Title className="card-content-limit card-title card-pengadaan-image">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
                <div className="detail-pengadaan-store-name">
                  <span style={{ fontWeight: "500", fontSize: "15px" }}>{post.namaCabang}</span>
                </div>
                <br/>
              <ProgressBar className="finished-progress-bar" now={(post.danaTerkumpul/post.totalBiaya*100) + 10} label={(post.danaTerkumpul/post.totalBiaya*100) + "%"}/>
              <Card.Text>
                <p className="card-content-limit">{post.deskripsiToko}</p>
              </Card.Text>
            </Card.Body>
          </Card>
          }
        </a>
      ))}
    </CardColumns>
  );
};

export default Cards;