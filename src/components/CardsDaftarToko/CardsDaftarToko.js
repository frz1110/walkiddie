import React from 'react';
import './CardsDaftarToko.css';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'

const CardsDaftarToko = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <CardColumns>
      {posts.map(post => (
        <a href={"/pengadaan-mainan/"} className="custom-card-daftartoko-walkiddie">
          <Card className="card-daftartoko-flex-item" key={post.pk}
            style={{
              height : '470px'
            }}
          >
            <Card.Img variant="top" src={post.fotoProfilToko} 
              style={{
                height : '200px'
              }}
            />
            <Card.Body>
              <Card.Title className="card-daftartoko-content-limit card-daftartoko-title">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
              <Card.Text className="card-daftartoko-content-limit card-daftartoko-text">
                {post.deskripsiToko}
              </Card.Text>
              <button className="wkd-home-button wkd-nav-button wkd-tosca-button">
                Buat Pengadaan
              </button>
            </Card.Body>
          </Card>
        </a>
      ))}
    </CardColumns>
  );
};

export default CardsDaftarToko;