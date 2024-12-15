import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import { Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import "bootstrap/dist/css/bootstrap.min.css";
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";
import { useDispatch, useSelector } from "react-redux";
import { setModelStatus } from "shared/slice/Model/ModelSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Styled Components
const CustomModal = styled(Modal)`
  .modal-content {
    border-radius: 12px;
    box-shadow: 0 15px 60px rgba(0, 0, 0, 0.2);
    background-color: #ffffff;
  }
  .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    .modal-dialog {
      max-width: 600px;
    }
  }
`;

const ModalHeader = styled(Modal.Header)`
  background-color: #007bff;
  color: white;
  border-bottom: none;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  padding: 20px;
`;

const ModalTitle = styled(Modal.Title)`
  font-weight: 600;
  font-size: 1.75rem;
`;

const ModalBody = styled(Modal.Body)`
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const StyledFormControl = styled(Form.Control)`
  border-radius: 8px;
  border: 1px solid #ced4da;
  margin-bottom: 15px;
  padding: 12px 15px;
  transition: border-color 0.3s, box-shadow 0.3s;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const StyledButton = styled(Button)`
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 600;
  background: linear-gradient(90deg, #007bff, #0056b3);
  border: none;
  transition: background 0.3s, transform 0.2s;
  &:hover {
    background: linear-gradient(90deg, #0056b3, #003f7f);
    transform: translateY(-2px);
  }
`;

const FormLabel = styled(Form.Label)`
  font-weight: 600;
  margin-bottom: 10px;
  color: #007bff;
`;

const FormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
`;

const DatePickerWrapper = styled.div`
  position: relative;
  width: 100%;
  .react-datepicker {
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
`;

const IconWrapper = styled.span`
  margin-right: 10px;
  color: #007bff;
`;

const StyledIcon = styled(Icon)`
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
`;

function Dossier( data ) {
  const [modalOpen, setModalOpen2] = useState(false);
  const [formData, setFormData] = useState({
    name: data.data.name || "",
    Status: data.data.Status || "",
    Client: data.data.Client || "",
    NbSession: data.data.NbSession || "",
    Session: data.data.Session || [],
    Document: data.data.Document || [],
  });

  const dispatch = useDispatch();

  const handleModifier = () => {
    setModalOpen2(true);
    dispatch(setModelStatus({ modelOpen: true }));
  };

  const handleClose = () => {
    setModalOpen2(false);
    dispatch(setModelStatus({ modelOpen: false }));
  };

  const handleUpdate = () => {
    handleClose();
    alert("Information updated!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      DateNai: date,
    }));
  };

  return (
    <>
      <Card sx={{ height: "100%" }}>
        <ArgonBox display="flex" justifyContent="space-between" alignItems="center" pt={2} px={2}>
          <ArgonTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            {formData.name}
          </ArgonTypography>
          <ArgonTypography variant="body2" color="secondary" style={{ fontSize: "1.5rem", padding: "10px" }}>
            <Tooltip placement="top" onClick={handleModifier}>
              <StyledIcon style={{ fontSize: "1.5rem" }}>edit</StyledIcon>
            </Tooltip>
          </ArgonTypography>
        </ArgonBox>

        <ArgonBox>
          <ArgonBox p={2}>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                Status
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{formData.Status}
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                Client
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{formData.Client}
              </ArgonTypography>
            </ArgonBox>
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                NbSession
              </ArgonTypography>
              <ArgonTypography variant="button" fontWeight="regular" color="text">
                &nbsp;{formData.NbSession}
              </ArgonTypography>
            </ArgonBox>
            {/* Display Sessions */}
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                Sessions
              </ArgonTypography>
              {formData.Session && formData.Session.length > 0 ? (
                formData.Session.map((session, index) => (
                  <ArgonTypography key={index} variant="button" fontWeight="regular" color="text">
                    &nbsp;{session.Service} (ID: {session.idService})
                  </ArgonTypography>
                ))
              ) : (
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                  &nbsp;No sessions
                </ArgonTypography>
              )}
            </ArgonBox>
            {/* Display Documents */}
            <ArgonBox display="flex" py={1} pr={2}>
              <ArgonTypography variant="button" fontWeight="bold" textTransform="capitalize">
                Documents
              </ArgonTypography>
              {formData.Document && formData.Document.length > 0 ? (
                formData.Document.map((doc, index) => (
                  <ArgonTypography key={index} variant="button" fontWeight="regular" color="text">
                    &nbsp;{doc.name}: <a href={doc.lien} target="_blank" rel="noopener noreferrer">
                      {doc.lien}
                    </a>
                  </ArgonTypography>
                ))
              ) : (
                <ArgonTypography variant="button" fontWeight="regular" color="text">
                  &nbsp;No documents
                </ArgonTypography>
              )}
            </ArgonBox>
          </ArgonBox>
        </ArgonBox>
      </Card>

      {/* Modal for updating user information */}
      <CustomModal show={modalOpen} onHide={handleClose} centered backdrop="static">
        <ModalHeader closeButton>
          <ModalTitle>Update Information</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup controlId="formName">
              <FormLabel>Name</FormLabel>
              <StyledFormControl
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </FormGroup>
            <FormGroup controlId="formStatus">
              <FormLabel>Status</FormLabel>
              <StyledFormControl
                type="text"
                name="Status"
                value={formData.Status}
                onChange={handleChange}
                placeholder="Enter status"
              />
            </FormGroup>
            <FormGroup controlId="formClient">
              <FormLabel>Client</FormLabel>
              <StyledFormControl
                type="text"
                name="Client"
                value={formData.Client}
                onChange={handleChange}
                placeholder="Enter client name"
              />
            </FormGroup>
            <FormGroup controlId="formNbSession">
              <FormLabel>NbSession</FormLabel>
              <StyledFormControl
                type="text"
                name="NbSession"
                value={formData.NbSession}
                onChange={handleChange}
                placeholder="Enter number of sessions"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <Modal.Footer>
          <StyledButton variant="primary" onClick={handleUpdate}>
            Update
          </StyledButton>
          <StyledButton variant="secondary" onClick={handleClose}>
            Cancel
          </StyledButton>
        </Modal.Footer>
      </CustomModal>
    </>
  );
}

export default Dossier;
