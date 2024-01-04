import React, { useState, useEffect } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Common from "../shared/Common";
import "../styles/create.css";
import { FaCalendarWeek } from "react-icons/fa";
import { createNewPassbook } from "../services/userService";
import { toast } from "react-toastify";
import { getListTerm } from "../services/userService";

const Create = () => {
  const [credentials, setCredentials] = useState({
    code: "",
    type: "",
    username: "",
    identity: "",
    address: "",
    date: "",
    deposit: "",
  });
  
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
  
  const handleChange = (e) => {
    // console.log(e.target.value);
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Follow state of form after successfully submit create 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // Reset state of form after successfully create
  const resetForm = () => {
    setCredentials({
      code: "",
      type: "",
      username: "",
      identity: "",
      address: "",
      date: "",
      deposit: "",
    });
    setIsFormSubmitted(true);
  };

  // Use value of state to set default value of form input
  useEffect(() => {
    if (isFormSubmitted) {
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted]);

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("User Input:", credentials);
    try {
      let response = await createNewPassbook(credentials);
      console.log("check response: ", response);
      toast.success("Created successfully", {autoClose: 1000});
      resetForm();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {autoClose: 1000});
    }
  };

  return (
    <>
      <div className="create__container">
        <Common
          title={"Create new passbook"}
          desc={"Fill in the form to create new passbook for customer"}
        />

        <Form className="form" onSubmit={handleClick}>
          <div className="input__container">
            <div className="input d-flex">
              <div className="input__child">
                <label htmlFor="code">Code</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter code"
                    required
                    id="code"
                    value={credentials.code}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="input__child">
                <label htmlFor="type">Type</label>
                <FormGroup className="content">
                  <select
                    type="select"
                    placeholder="Choose type of passbook"
                    required
                    id="type"
                    value={credentials.type}
                    onChange={handleChange}
                  >
                    <option value="">Select type of passbook</option>
                    {/* {listTerm && console.log("check bug:", listTerm[0].name)} */}
                    {listTerm &&
                      listTerm.map((item) => (
                        <option key={item.type} value={item.type}>{item.name}</option>
                      ))}
                  </select>
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex">
              <div className="input__child">
                <label htmlFor="username">Customer name</label>
                <FormGroup className="content">
                  <input
                    type="text"c
                    placeholder="Enter customer name"
                    required
                    id="username"
                    value={credentials.username}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="input__child">
                <label htmlFor="identity">Identity card</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter identity card"
                    required
                    id="identity"
                    value={credentials.identity}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex">
              <div className="input__child">
                <label htmlFor="address">Address</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter address"
                    required
                    id="address"
                    value={credentials.address}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="input__child">
                <label htmlFor="date">Date of creation</label>
                <FormGroup className="content">
                  <input
                    type="date"
                    placeholder="Enter created date"
                    required
                    id="date"
                    value={credentials.date}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input last input__child">
              <label htmlFor="deposit">Deposit</label>
              <FormGroup className="content d-flex align-items-center gap-2">
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

          <Button type="submit" className="btn primary__btn create">
            Create
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Create;
