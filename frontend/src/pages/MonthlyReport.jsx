import React, { useState, useEffect } from "react";
import "../styles/monthly-report.css";
import Common from "../shared/Common";
import { Button, Form, FormGroup, Input } from "reactstrap";
import ListMonthlyInfo from "../components/table/ListMonthlyInfo";
import { getMonthlyReport, getListTerm } from "../services/userService";
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
    <div className="monthly-report__container">
      <Common title={"Monthly Open/Close Report"} />
      <div className="monthly__section">
        <Form className="monthly__form" onSubmit={handleSubmit}>
          <div className="input-container">
            <FormGroup className="monthly__content">
              <label htmlFor="passbookType">Choose type of passbook</label>
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
            <FormGroup className="monthly__content">
              <label htmlFor="month">Choose month</label>
              <Input type="month" required id="month" onChange={handleChange} />
              {/* <Input
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
                            </Input> */}
            </FormGroup>

            <Button type="submit" className="primary__btn button">
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
