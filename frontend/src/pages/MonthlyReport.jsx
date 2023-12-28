import React, { useState, useEffect } from "react";
import "../styles/monthly-report.css";
import Common from "../shared/Common";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ListMonthlyInfo from "../components/table/ListMonthlyInfo";
import { getMonthlyReport, getListTerm } from "../services/userService";
import { Select } from "@mui/material";
function MonthlyReport() {
  const [formData, setFormData] = useState({ type: "", month: "" });
  const [data, setData] = useState([]);
  const [listTerm, setListTerm] = useState();
  const fetchData = async () => {
    try {
      const apiData = await getListTerm();
      if (+apiData.status === 200) {
        console.log("check term: ", apiData);
        // console.log("check data: ", apiData.data);
        if (apiData.data) {
          setListTerm(apiData.data);
        }
      }
    } catch (error) {
      // Handle errors as needed
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const tempMonth = e.target[1].value;
    // const tempType = e.target[0].value;
    // setFormData({ type: tempType, month: tempMonth });
    console.log("check formdata:", formData);
    try {
      const apiData = await getMonthlyReport(formData);
      // console.log("check getmonth: ", apiData);

      if (+apiData.status === 200) {
        if (apiData.data) {
          // console.log("check data: ", apiData.data);
          setData(apiData.data);
        }
      }
    } catch (error) {
      // Handle errors as needed
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  return (
    <div className="monthly__container">
      <Common title={"Monthly Open/Close Report"} />
      <div className="monthly__section">
        <Form className="monthly__form" onSubmit={handleSubmit}>
          <div className="input__container monthly">
            <div className="monthly__content">
              <FormGroup >
                <label htmlFor="passbookType" className="mb-1">Choose type of passbook</label>
                <Input type="select" id="type" required onChange={handleChange}>
                  <option value="">Select type of passbook</option>
                  {listTerm &&
                    listTerm.map((item) => (
                      <option value={item.type}>{item.name}</option>
                    ))}
                  {/* <option value="0">DDA</option>
                  <option value="1">3 months</option>
                  <option value="2">6 months</option> */}
                </Input>
              </FormGroup>
              <FormGroup >
                <label htmlFor="month" className="mb-1">Choose month</label>
                <Input type="month" required id="month" onChange={handleChange} />
              </FormGroup>
            </div>

            <Button type="submit" className="btn primary__btn monthly__btn">
                Confirm
            </Button>
          </div>
        </Form>
        <div className="monthly__info">
          <ListMonthlyInfo data={data} />
        </div>
      </div>
    </div>
  );
}

export default MonthlyReport;
