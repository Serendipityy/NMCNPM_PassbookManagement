import React, { useState, useEffect } from "react";
import "../styles/daily-report.css";
import "../components/table/table.css";
import Common from "../shared/Common";
import { Button, Form, FormGroup } from "reactstrap";
import ListDailyInfo from "../components/table/ListDailyInfo";
import { getDailyReport } from "../services/userService";
import {FaSpinner} from 'react-icons/fa'

function DailyReport() {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const apiData = await getDailyReport(date);
      console.log("check apiData: ", apiData);

      if (+apiData.status === 200) {
        if (apiData.data) {
          console.log("check data: ", apiData.data);
          setData(apiData.data);
        }
      }
    } catch (error) {
      // Handle errors as needed
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    console.log("test: ", e.target.value);
    setDate(e.target.value);
  };
  //   const handleChange = (e) => {
  //     console.log("test: ", e.target.value);
  //     //   setDate((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  //   };
  return (
    <>
      <div className="daily__container">
        <Common 
          title={"Daily Turnover Reports"} 
          desc={"View the Daily Turnover Reports for a concise summary of financial activities"}  
        />
        <div className="daily__section">
          <Form className="daily__form" onSubmit={handleSubmit}>
            <div className="input__container daily">
              <label htmlFor="date">Enter date for report</label>
              <FormGroup className="daily__content">
                <input
                  type="date"
                  placeholder="Enter date"
                  required
                  id="date"
                  onChange={handleChange}
                />

                <Button type="submit" className="btn primary__btn button">
                  Confirm
                </Button>
              </FormGroup>
            </div>
          </Form>

          <div className="daily__info">
            {loading ? (
              <p><FaSpinner className="loading-icon" /> Loading...</p>
            ) :  (
              <ListDailyInfo data={data} /> )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DailyReport;
