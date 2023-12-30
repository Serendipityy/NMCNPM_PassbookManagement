import React, { useState, useEffect } from "react";
import "../styles/daily-report.css";
import "../components/table/table.css";
import Common from "../shared/Common";
import { Button, Form, FormGroup } from "reactstrap";
import ListDailyInfo from "../components/table/ListDailyInfo";
import RegulationTable from "../components/table/RegulationTable";
import { getDailyReport } from "../services/userService";
function RegulationChange() {
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
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
          title={"Regulation Change"} 
          desc={"You can change some regulations here"}
        />
        <div className="daily__section">
          <RegulationTable />
          <div className="daily__info"></div>
        </div>
      </div>
    </>
  );
}

export default RegulationChange;
