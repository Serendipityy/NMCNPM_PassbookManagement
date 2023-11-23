import React from 'react'
import {Form, FormGroup, Button } from 'reactstrap'
import {Link} from 'react-router-dom'
import Common from '../shared/Common'
import '../styles/deposit.css'


const Deposit = () => {
  return (
    <>
    <div className='deposit__container'>
      <Common title={"Deposit Slip"} desc={"Fill in this deposit slip"} />
          
      <Form className='deposit__form'>
          <div className='input__container'>
            <div className='input d-flex gap-5'>
              <div className='w-50'>
                <label htmlFor='deposit-code'>Code</label>
                <FormGroup className='deposit__content'>  
                  <input 
                    type='text' 
                    placeholder='Enter code' 
                    required 
                    id='deposit-code'
                  />
                </FormGroup>
              </div>      

              <div className='w-50'>
                <label htmlFor='deposit-username'>Username</label>
                <FormGroup className='deposit__content'>  
                  <input 
                    type='text' 
                    placeholder='Enter username' 
                    required 
                    id='deposit-username'
                  />
                </FormGroup>
              </div>  
            </div>

            <div className='input d-flex gap-5'>            
              <div className='w-50'>
                <label htmlFor='deposit-date'>Date of deposit</label>
                <FormGroup className='deposit__content'>
                  <input 
                    type='date' 
                    placeholder='Enter deposited date' 
                    required 
                    id='deposit-date'
                  />
                </FormGroup>
              </div>    

              <div className='w-50'>
                <label htmlFor='deposit'>Deposit</label>
                <FormGroup className='deposit__content'>
                  <input 
                    type='number' 
                    placeholder='Enter deposit' 
                    required 
                    id='deposit'
                  />
                </FormGroup>
              </div>
            </div>

          </div>

          <Button type='submit' className='btn primary__btn deposit mt-3'>
            Deposit
          </Button>
      </Form>
    </div>
       
    </>
  )
}

export default Deposit