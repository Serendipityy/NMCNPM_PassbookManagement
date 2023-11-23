import React, { useState } from 'react'
import {Form, FormGroup, Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import Common from '../shared/Common'
import '../styles/create.css'
import { FaCalendarWeek } from "react-icons/fa";

const Create = () => {
  const [credentials, setCredentials] = useState({
    code: '',
    type: '',
    username: '',
    identity: '',
    address: '',
    date: '',
    deposit: '',
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = e => {
    e.preventDefault();
    console.log('User Input:', credentials);
  }

  return (
    <>
    <div className='create__container'>
      <Common title={"Create new passbook"} desc={"Fill in the form to create new passbook for customer"} />
          
      <Form className='form' onSubmit={handleClick}>
          <div className='input__container'>
            <div className='input d-flex gap-5'>
              <div className='w-50'>
                <label htmlFor='code'>Code</label>
                <FormGroup className='content'>  
                  <input 
                    type='text' 
                    placeholder='Enter code' 
                    required 
                    id='code'
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>      

              <div className='w-50'>
              <label htmlFor='type'>Type</label>
              <FormGroup className='content'>
                <input 
                  type='text' 
                  placeholder='Enter type of passbook' 
                  required 
                  id='type'
                  onChange={handleChange}
                />
              </FormGroup>
              </div>
            </div>

            <div className='input d-flex gap-5'>
              <div className='w-50'>
                <label htmlFor='username'>Username</label>
                <FormGroup className='content'>  
                  <input 
                    type='text' 
                    placeholder='Enter username' 
                    required 
                    id='username'
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>      

              <div className='w-50'>
              <label htmlFor='identity'>Identity card</label>
              <FormGroup className='content'>
                <input 
                  type='text' 
                  placeholder='Enter identity card' 
                  required 
                  id='identity'
                  onChange={handleChange}
                />
              </FormGroup>
              </div>
            </div>

            <div className='input d-flex gap-5'>
              <div className='w-50'>
                <label htmlFor='address'>Address</label>
                <FormGroup className='content'>  
                  <input 
                    type='text' 
                    placeholder='Enter address' 
                    required 
                    id='address' 
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>      

              <div className='w-50'>
              <label htmlFor='date'>Date of creation</label>
              <FormGroup className='content'>
                <input 
                  type='date' 
                  placeholder='Enter created date' 
                  required 
                  id='date'
                  onChange={handleChange}
                />
              </FormGroup>
              </div>
            </div>


            <div className='input last'>
              <label htmlFor='deposit'>Deposit</label>
              <FormGroup className='content d-flex align-items-center gap-2'>
                <input 
                  type='number' 
                  placeholder='Enter deposit' 
                  required 
                  id='deposit'
                  onChange={handleChange}
                />
              </FormGroup>
            </div>
          </div>

          <Button type='submit' className='btn primary__btn create mt-2'>
            Create
          </Button>
      </Form>
    </div>
       
    </>
  )
}

export default Create