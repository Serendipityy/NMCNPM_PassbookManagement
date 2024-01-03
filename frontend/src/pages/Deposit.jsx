import React, { useState, useEffect } from "react";
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

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const resetForm = () => {
    setCredentials({
      passbookCode: "",
      depositDate: "",
      customerName: "",
      deposit: "",
    });
    setIsFormSubmitted(true);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let response = await putMoney(credentials);
      console.log("check response: ", response);
      toast.success("Deposit successfully", {autoClose: 1000});
      resetForm();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {autoClose: 1000});
    }
  };
  return (
    <>
      <div className="deposit__container">
        <Common title={"Deposit Slip"} desc={"Fill in this deposit slip"} />

        <Form className="deposit__form" onSubmit={handleClick}>
          <div className="input__container">
            <div className="input__deposit d-flex">
              <div className="input__child">
                <label htmlFor="deposit-code">Code</label>
                <FormGroup className="deposit__content">
                  <input
                    type="text"
                    placeholder="Enter code"
                    required
                    id="passbookCode"
                    value={credentials.passbookCode}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="input__child">
                <label htmlFor="deposit-username">Customer name</label>
                <FormGroup className="deposit__content">
                  <input
                    type="text"
                    placeholder="Enter customer name"
                    required
                    id="customerName"
                    value={credentials.customerName}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input__deposit d-flex">
              <div className="input__child">
                <label htmlFor="deposit-date">Date of deposit</label>
                <FormGroup className="deposit__content">
                  <input
                    type="date"
                    placeholder="Enter deposited date"
                    required
                    id="depositDate"
                    value={credentials.depositDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="input__child">
                <label htmlFor="deposit">Deposit</label>
                <FormGroup className="deposit__content">
                  <input
                    type="number"
                    placeholder="Enter deposit"
                    required
                    id="deposit"
                    value={credentials.deposit}
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
