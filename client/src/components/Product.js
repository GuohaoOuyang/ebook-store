import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
  return (
    <Card border="light" className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong style={{fontSize:'0.8rem'}}>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
          <Rating
            value={product.rating}
            text={product.numReviews} 
          />
        </Card.Text>

        <Card.Text as='h3' style={{fontSize:'0.8rem'}}>Fair Price: <span style={{color:'rgb(172,45,19)'}}>${product.price}</span></Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
