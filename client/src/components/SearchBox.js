import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { SearchIcon } from 'react-line-awesome'


const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} inline className='ml-auto' style={{position:'relative'}}> 
      <Form.Control
        type='text'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder= 'SEARCH'
        className='mr-sm-2 ml-sm-5'
        style={{borderRadius:'1rem',outline:'none'}}
      ></Form.Control>
      <button style={{border:'none', position:'absolute', right:'0.5rem', cursor:'pointer', outline:'none', backgroundColor:'transparent'}} type='submit'><SearchIcon className='la-lg'/></button>
    </Form>
  )
}

export default SearchBox
