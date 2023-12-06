import React, { useState } from "react";
import { Form, FormGroup, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Common from "../shared/Common";
import "../styles/withdraw.css";
import { withdrawMoney } from "../services/userService";
import { toast } from "react-toastify";

const Withdraw = () => {
  const [credentials, setCredentials] = useState({
    passbookCode: "",
    withdrawalDate: "",
    customerName: "",
    withdraw: "",
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      let response = await withdrawMoney(credentials);
      console.log("check response: ", response);

      toast.success("Withdrawal slip successfully");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  return (
    <>
      <div className="withdraw__container">
        <Common
          title={"Withdrawal Slip"}
          desc={"Fill in this withdrawal slip"}
        />

        <Form className="withdraw__form" onSubmit={handleClick}>
          <div className="input__container">
            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="withdraw-code">Code</label>
                <FormGroup className="withdraw__content">
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
                <label htmlFor="withdraw-username">Username</label>
                <FormGroup className="withdraw__content">
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
                <label htmlFor="withdraw-date">Date of withdraw</label>
                <FormGroup className="withdraw__content">
                  <input
                    type="date"
                    placeholder="Enter withdrawed date"
                    required
                    id="withdrawalDate"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="withdraw">Withdraw</label>
                <FormGroup className="withdraw__content">
                  <input
                    type="number"
                    placeholder="Enter withdraw"
                    required
                    id="withdraw"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <Button type="submit" className="btn primary__btn withdraw mt-3">
            Withdraw
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Withdraw;
