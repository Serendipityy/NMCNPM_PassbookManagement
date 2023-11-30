import React, { useState } from 'react'
import '../styles/monthly-report.css'
import Common from '../shared/Common'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import ListMonthlyInfo from '../components/table/ListMonthlyInfo'


function MonthlyReport() {
    const [formData, setFormData] = useState({ type: '', month: '' });
    const handleSubmit = e => {
        e.preventDefault()
        const tempMonth = e.target[1].value
        const tempType = e.target[0].value
        setFormData({ type: tempType, month: tempMonth })
    }
    return (
        <div className='monthly-report__container'>
            <Common title={"Monthly Open/Close Report"} />
            <div className="monthly__section">
                <Form className='monthly__form' onSubmit={handleSubmit}>
                    <div className='input-container'>

                        <FormGroup className='monthly__content'>
                            <label htmlFor='passbookType'>Choose type of passbook</ label>
                            <Input
                                type='select'
                                id='passbookType'
                                required
                            >
                                <option value=''>Select type of passbook</option>
                                <option value='DDA'>DDA</option>
                                <option value='3-months'>3 months</option>
                                <option value='6-months'>6 months</option>
                            </Input>

                        </FormGroup>
                        <FormGroup className='monthly__content'>
                            <label htmlFor='month'>Choose month</ label>
                            <Input
                                type='select'
                                id='month'
                                required
                            >
                                <option value=''>Select month</option>
                                <option value='1'>January</option>
                                <option value='2'>February</option>
                                <option value='3'>March</option>
                                <option value='4'>April</option>
                                <option value='5'>May</option>
                                <option value='6'>June</option>
                                <option value='7'>July</option>
                                <option value='8'>August</option>
                                <option value='9'>September</option>
                                <option value='10'>October</option>
                                <option value='11'>November</option>
                                <option value='12'>December</option>
                            </Input>
                        </FormGroup>

                        <Button type='submit' className='primary__btn button'>
                            Confirm
                        </Button>
                    </div>

                </Form>
                <div className="monthly__info">
                    <ListMonthlyInfo data={formData} />
                </div>

            </div>
        </div>

    )
}

export default MonthlyReport