import React from 'react'
import {Form, FormGroup, Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import Common from '../shared/Common'
import '../styles/withdraw.css'


const Withdraw = () => {
  return (
    <>
    <div className='withdraw__container'>
      <Common title={"Withdrawal Slip"} desc={"Fill in this withdrawal slip"} />
          
      <Form className='withdraw__form'>
          <div className='input__container'>
            <div className='input d-flex gap-5'>
              <div className='w-50'>
                <label htmlFor='withdraw-code'>Code</label>
                <FormGroup className='withdraw__content'>  
                  <input 
                    type='text' 
                    placeholder='Enter code' 
                    required 
                    id='withdraw-code'
                  />
                </FormGroup>
              </div>      

              <div className='w-50'>
                <label htmlFor='withdraw-username'>Username</label>
                <FormGroup className='withdraw__content'>  
                  <input 
                    type='text' 
                    placeholder='Enter username' 
                    required 
                    id='withdraw-username'
                  />
                </FormGroup>
              </div>
            </div>

            <div className='input d-flex gap-5'>            
              <div className='w-50'>
                <label htmlFor='withdraw-date'>Date of withdraw</label>
                <FormGroup className='withdraw__content'>
                  <input 
                    type='date' 
                    placeholder='Enter withdrawed date' 
                    required 
                    id='withdraw-date'
                  />
                </FormGroup>
              </div>    

              <div className='w-50'>
                <label htmlFor='withdraw'>withdraw</label>
                <FormGroup className='withdraw__content'>
                  <input 
                    type='number' 
                    placeholder='Enter withdraw' 
                    required 
                    id='withdraw'
                  />
                </FormGroup>
              </div>
            </div>

          </div>

          <Button type='submit' className='btn primary__btn withdraw mt-3'>
            Withdraw
          </Button>
      </Form>
    </div>
       
    </>
  )
}

export default Withdraw