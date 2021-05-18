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
        <Card className="card-flex-item" key={post.id}>
          <Card.Img variant="top" src="https://i.stack.imgur.com/y9DpT.jpg" />
          <Card.Body>
            <Card.Title className="card-content-limit card-title">
              <img className="toko-profil-img" src="https://cwdaust.com.au/wpress/wp-content/uploads/2015/04/placeholder-store.png" alt="Avatar"></img>
              {post.title}
            </Card.Title>
            <ProgressBar variant="success" now={55} label={55 + "%"} />
            <Card.Text className="card-content-limit card-text">
              {post.body}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </CardColumns>
  );
};

export default Cards;