import React, { useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Common from "../shared/Common";
import "../styles/deposit.css";
import { putMoney } from "../services/userService";
import { toast } from "react-toastify";

const Deposit = () => {
  const [credentials, setCredentials] = useState({
    passbookCode: "",
    depositDate: "",
    customerName: "",
    deposit: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let response = await putMoney(credentials);
      console.log("check response: ", response);

      toast.success("Deposit successfully");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="deposit__container">
        <Common title={"Deposit Slip"} desc={"Fill in this deposit slip"} />

        <Form className="deposit__form" onSubmit={handleClick}>
          <div className="input__container">
            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="deposit-code">Code</label>
                <FormGroup className="deposit__content">
                  <input
                    type="text"
                    placeholder="Enter code"
                    required
                    id="passbookCode"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="deposit-username">Username</label>
                <FormGroup className="deposit__content">
                  <input
                    type="text"
                    placeholder="Enter username"
                    required
                    id="customerName"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="deposit-date">Date of deposit</label>
                <FormGroup className="deposit__content">
                  <input
                    type="date"
                    placeholder="Enter deposited date"
                    required
                    id="depositDate"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="deposit">Deposit</label>
                <FormGroup className="deposit__content">
                  <input
                    type="number"
                    placeholder="Enter deposit"
                    required
                    id="deposit"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <Button type="submit" className="btn primary__btn deposit mt-3">
            Deposit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Deposit;
