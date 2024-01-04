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
import '../styles/modal-passbook.css'

const ModalPassbook = (props) => {
  const [data, setData] = useState({
    type: "",
    typeName: "",
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
        type: props.dataModal.data.type,
        typeName: props.dataModal.data.name,
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
        props.fetchData();
      } catch (e) {
        console.log(e);
        toast.error(e.response.data.message);
      }
    } else {
      try {
        // console.log("data???: ", data);
        let response = await changeType(data);
        console.log("check response: ", response);
        toast.success("Update successfully");
        props.fetchData();
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
      {/* {console.log("check state: ", data)} */}
      <Modal isOpen={props.show} toggle={props.handleCloseModal}>
        <ModalHeader toggle={props.handleCloseModal}>
          {props && props.dataModal && props.dataModal.state === 1
            ? "Change type"
            : "Create type"}
        </ModalHeader>
        <ModalBody>
          <Form>
            <div className="input d-flex gap-5">
              <div className="w-50">
                <FormGroup className="change__content">
                  <Label>Type(Months)</Label>
                  <Input
                    type="text"
                    id="typeName"
                    value={data.typeName}
                    onChange={handleChange}
                    disabled={props.dataModal.state === 1} // Disable if state is 1 (change type)
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <FormGroup className="change__content">
                  <Label>Minimum deposit amount</Label>
                  <Input
                    type="number"
                    id="minDepo"
                    value={data.minDepo}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>
            </div>

            <div className="input d-flex gap-5">
              <div className="w-50">
                <FormGroup className="change__content">
                  <Label>Minimum sending time:</Label>
                  <Input
                    type="number"
                    id="minTime"
                    value={data.minTime}
                    onChange={handleChange}
                  />
                </FormGroup>
              </div>

              <div className="w-50">
                <FormGroup className="change__content">
                  <Label>Interest rate:</Label>
                  <Input
                    type="number"
                    id="interestRate"
                    value={data.interestRate}
                    onChange={handleChange}
                    step="0.0001"
                  />
                </FormGroup>
              </div>
            </div>
          </Form>
        </ModalBody>
        {/* Thêm các trường khác cần thiết cho form */}
        <ModalFooter>
          <Button className='btn primary__btn change__create' type="submit" color="primary" onClick={handleSubmit}>
            {props.dataModal && props.dataModal.state === 0
              ? "Create"
              : "Update"}
          </Button>{" "}
          <Button className='btn secondary__btn change__cancel' onClick={props.handleCloseModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
export default ModalPassbook;
