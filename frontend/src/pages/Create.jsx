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

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("User Input:", credentials);
    try {
      let response = await createNewPassbook(credentials);
      console.log("check response: ", response);
      toast.success("Created successfully");
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
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
            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="code">Code</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter code"
                    required
                    id="code"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="type">Type</label>
                <FormGroup className="content">
                  <select
                    type="select"
                    placeholder="Choose type of passbook"
                    required
                    id="type"
                    onChange={handleChange}
                  >
                    <option value="">Select type of passbook</option>
                    {/* {listTerm && console.log("check bug:", listTerm[0].name)} */}
                    {listTerm &&
                      listTerm.map((item) => (
                        <option key={item.type} value={item.type}>{item.name}</option>
                      ))}
                    {/* <option value="0">DDA</option>
                      <option value="1">3 months</option>
                      <option value="2">6 months</option> */}
                  </select>
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="username">Full name</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter username"
                    required
                    id="username"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="identity">Identity card</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter identity card"
                    required
                    id="identity"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex gap-5">
              <div className="w-50">
                <label htmlFor="address">Address</label>
                <FormGroup className="content">
                  <input
                    type="text"
                    placeholder="Enter address"
                    required
                    id="address"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <label htmlFor="date">Date of creation</label>
                <FormGroup className="content">
                  <input
                    type="date"
                    placeholder="Enter created date"
                    required
                    id="date"
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input last">
              <label htmlFor="deposit">Deposit</label>
              <FormGroup className="content d-flex align-items-center gap-2">
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

          <Button type="submit" className="btn primary__btn create">
            Create
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Create;
