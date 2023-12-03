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
import { toast } from "react-toastify";
import { addNewType, changeType } from "../services/userService";
const ModalPassbook = (props) => {
  const [data, setData] = useState({
    type: "",
    minDepo: "",
    minTime: "",
    interestRate: "",
  });
  useEffect(() => {
    if (
      props &&
      props.dataModal.state &&
      props.dataModal.state === 1 &&
      props.dataModal
    ) {
      setData({
        type: props.dataModal.data.name,
        minDepo: props.dataModal.data.minDeposit,
        minTime: props.dataModal.data.daysWithdrawn,
        interestRate: props.dataModal.data.interestRate,
      });
    }
  }, []);
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("here");
    if (props.dataModal.state === 0) {
      try {
        let response = await addNewType(data);
        console.log("check response: ", response);
        toast.success("Created successfully");
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    } else {
      try {
        let response = await changeType(data);
        console.log("check response: ", response);
        toast.success("Created successfully");
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    }
    props.handleCloseModal();
  };
  // const handleSubmit
  return (
    <div>
      {/* {console.log("check props:", props)} */}
      {/* {console.log("check state: ", data)} */}
      <Modal isOpen={props.show} toggle={props.handleCloseModal}>
        <ModalHeader toggle={props.handleCloseModal}>
          {props && props.dataModal && props.dataModal.state === 1
            ? "Change type"
            : "Create type"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Type(Months)</Label>
              <Input
                type="text"
                id="type"
                value={data.type}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Minimum deposit amount</Label>
              <Input
                type="number"
                id="minDepo"
                value={data.minDepo}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Minimum sending time:</Label>
              <Input
                type="number"
                id="minTime"
                value={data.minTime}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label>Interest rate:</Label>
              <Input
                type="number"
                id="interestRate"
                value={data.interestRate}
                onChange={handleChange}
                step="0.0001"
              />
            </FormGroup>
            {/* Thêm các trường khác cần thiết cho form */}
            <ModalFooter>
              <Button type="submit" color="primary" onClick={handleSubmit}>
                {props.dataModal && props.dataModal.state === 0
                  ? "Create"
                  : "Update"}
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
