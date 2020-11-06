import React, { useEffect } from 'react'
import { Jumbotron, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'

const ProductBanner = () => {
  const dispatch = useDispatch()

  const productTopRated = useSelector((state) => state.productTopRated)
  const { loading, error, products } = productTopRated

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Jumbotron style={{backgroundSize:'contain',backgroundPosition:'right', backgroundRepeat:'no-repeat',backgroundImage:`url(${products.image})`}}>
      <Container>
        <h1>{products.name}</h1>  
        <p>
          {products.description}
        </p>
        <p>
          <Button href={`/product/${products._id}`} variant="primary" >Learn more</Button>
        </p>
      </Container>
    </Jumbotron>
  )
}

export default ProductBanner
