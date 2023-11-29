import React, { useState } from 'react'
import '../styles/monthly-report.css'
import Common from '../shared/Common'
import { Button, Form, FormGroup, Input } from 'reactstrap'
import ListMonthlyInfo from '../components/table/ListMonthlyInfo'


function MonthlyReport() {
    const [month, setMonth] = useState('');
    const [type, setType] = useState('');

    const handleSubmit = e => {
        e.preventDefault()
        console.log(type, month);
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
                                onChange={(e) => setMonth(e.target.value)}
                            >
                                <option value='' disabled>Select type of passbook</option>
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
                                onChange={(e) => setType(e.target.value)}

                            >
                                <option value='' disabled>Select month</option>
                                <option value='January'>January</option>
                                <option value='February'>February</option>
                                <option value='March'>March</option>
                                <option value='April'>April</option>
                                <option value='May'>May</option>
                                <option value='June'>June</option>
                                <option value='July'>July</option>
                                <option value='August'>August</option>
                                <option value='September'>September</option>
                                <option value='October'>October</option>
                                <option value='November'>November</option>
                                <option value='December'>December</option>
                            </Input>
                        </FormGroup>

                        <Button type='submit' className='primary__btn button'>
                            Confirm
                        </Button>
                    </div>

                </Form>
                <div className="monthly__info">
                    <ListMonthlyInfo />
                </div>

            </div>
        </div>

    )
}

export default MonthlyReport