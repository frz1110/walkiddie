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
        <a href={"/detail-pengadaan/"+post.pkToko} className="custom-card-walkiddie">
          <Card className="card-flex-item" key={post.pk}>
            <Card.Img variant="top" src={post.files[0]} />
            <Card.Body>
              <Card.Title className="card-content-limit card-title">
                <img className="toko-profil-img" src={post.fotoProfilToko} alt="Avatar"></img>
                {post.namaToko}
              </Card.Title>
              <ProgressBar variant="success" now={(post.danaTerkumpul/post.totalBiaya*100) + 10} label={(post.danaTerkumpul/post.totalBiaya*100) + "%"} />
              <Card.Text className="card-content-limit card-text">
                {post.deskripsiToko}
              </Card.Text>
            </Card.Body>
          </Card>
        </a>
      ))}
    </CardColumns>
  );
};

export default Cards;