import React from "react";
import { Button, Modal, ModalHeader, ModalFooter } from "reactstrap";
import '../styles/delete-confirmation-modal.css'
import {toast} from 'react-toastify'

const DeleteConfirmationModal = ({ show, handleClose, handleConfirm }) => {
  
  const handleDelete = async () => {
    try {
      await handleConfirm();
      toast.success('Deleted term type successfully');
      handleClose();
    } catch (error) {
      toast.error('Error deleting term type');
    }
  };


  return (
    <Modal isOpen={show} toggle={handleClose} className="delete__confirmation">
      <ModalHeader toggle={handleClose}>Are you sure to delete?</ModalHeader>
      <ModalFooter>
        <Button className="btn primary__btn delete__confirm" onClick={handleDelete}>
          Confirm
        </Button>
        <Button className="btn secondary__btn delete__cancel" onClick={handleClose}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteConfirmationModal;
