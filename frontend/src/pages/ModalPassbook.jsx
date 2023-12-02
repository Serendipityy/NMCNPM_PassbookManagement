import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const ModalPassbook = (props) => {
  const handleChange = (e) => {
    // setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  // const handleSubmit
  return (
    <div>
      {console.log("check props:", props)}
      <Modal isOpen={props.show} toggle={props.handleCloseModal}>
        <ModalHeader toggle={props.handleCloseModal}>
          {props && props.dataModal && props.state === 0
            ? "Change type"
            : "Create type"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                // value={formData.name}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                type="email"
                name="email"
                id="email"
                // value={formData.email}
                onChange={handleChange}
              />
            </FormGroup>
            {/* Thêm các trường khác cần thiết cho form */}
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                onClick={props.handleCloseModal}
              >
                Submit
              </Button>{" "}
              <Button color="secondary" onClick={props.handleCloseModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={props.handleCloseModal}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={props.handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};
export default ModalPassbook;
