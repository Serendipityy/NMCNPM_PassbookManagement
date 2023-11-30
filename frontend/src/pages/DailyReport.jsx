import React, { useState } from 'react'
import '../styles/daily-report.css'
import '../components/table/table.css'
import Common from '../shared/Common'
import { Button, Form, FormGroup } from 'reactstrap'
import ListDailyInfo from '../components/table/ListDailyInfo'

function DailyReport() {
    const [date, setDate] = useState('')
    let tempDate
    const handleSubmit = e => {
        e.preventDefault()
        setDate(tempDate)
    }
    return (
        <>
            <div className='daily__container'>
                <Common title={"Daily Turnover Reports"} />
                <div className="daily__section">
                    <Form className='daily__form' onSubmit={handleSubmit}>
                        <div className='input__container'>

                            <label htmlFor='date'>Enter date for report</ label>
                            <FormGroup className='daily__content'>
                                <input
                                    type='date'
                                    placeholder='Enter date'
                                    required
                                    id='date'
                                    onChange={(e) => tempDate = e.target.value}
                                />

                                <Button type='submit' className='primary__btn button'>
                                    Confirm
                                </Button>
                            </FormGroup>
                        </div>

                    </Form>
                    <div className="daily__info">
                        <ListDailyInfo date={date} />
                    </div>

                </div>
            </div>
        </>
    )
}

export default DailyReport